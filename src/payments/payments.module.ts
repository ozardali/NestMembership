import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutController } from './checkout.controller';
import { WebhookController } from './webhook.controller';
import { StripeService } from './stripe.service';
import { WebhookLogService } from './webhook-log.service';
import { Subscription } from '../subscriptions/subscriptions.entity';
import { User } from '../users/user.entity';
import { WebhookLog } from './webhook-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, User, WebhookLog])],
  providers: [StripeService, WebhookLogService],
  controllers: [CheckoutController, WebhookController],
  exports: [StripeService],
})
export class PaymentsModule {}
