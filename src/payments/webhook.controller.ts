import { Controller, Post, Req, Res, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { StripeService } from './stripe.service';
import { WebhookLogService } from './webhook-log.service';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(
    private readonly stripeService: StripeService,
    private readonly webhookLogService: WebhookLogService, // Webhook logları için servis
  ) {}

  @Post()
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) {
      this.logger.error(`Webhook signature or secret is missing.`);
      return res.status(400).send(`Webhook Error: Missing signature or secret`);
    }

    let event;

    try {
      this.logger.debug(`Webhook Request Body: ${JSON.stringify(req.body)}`);
      this.logger.debug(`Webhook Signature: ${sig}`);

      event = this.stripeService.constructEvent(
        req.body as Buffer,
        sig,
        webhookSecret,
      );
      this.logger.log(`Received Stripe Event: ${event.type}`);

      await this.webhookLogService.createLog(
        event.type,
        JSON.stringify(req.body),
        null,
      );
    } catch (err) {
      this.logger.error(
        `Webhook signature verification failed: ${err.message}`,
      );
      await this.webhookLogService.createLog(
        'verification_failed',
        JSON.stringify(req.body),
        err.message,
      );
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          await this.stripeService.handleCheckoutSessionCompleted(
            event.data.object,
          );
          break;
        case 'invoice.payment_succeeded':
          await this.stripeService.handleSubscriptionRenewal(event.data.object);
          break;
        case 'customer.subscription.updated':
          await this.stripeService.handleSubscriptionUpdated(event.data.object);
          break;
        case 'customer.subscription.deleted':
          await this.stripeService.handleSubscriptionDeleted(event.data.object);
          break;
        default:
          this.logger.warn(`Unhandled event type ${event.type}`);
          await this.webhookLogService.createLog(
            event.type,
            JSON.stringify(req.body),
            'Unhandled event',
          );
      }
    } catch (err) {
      this.logger.error(
        `Failed to process event ${event.type}: ${err.message}`,
      );
      await this.webhookLogService.createLog(
        event.type,
        JSON.stringify(req.body),
        err.message,
      );
      return res.status(500).send(`Webhook Error: ${err.message}`);
    }
    res.json({ received: true });
  }
}
