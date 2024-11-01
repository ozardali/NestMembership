import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { StripeService } from '../payments/stripe.service';
import { RequestWithUser } from '../auth/types/request-with-user.interface';
import { SubscriptionService } from './subscription.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Get('products')
  async getAvailableProducts() {
    return this.stripeService.listProductsAndPrices();
  }

  @UseGuards(JwtAuthGuard)
  @Get('details')
  async getSubscriptionDetails(@Req() req: RequestWithUser) {
    const userId = req.user.userId;
    return this.subscriptionService.getUserSubscriptions(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getSubscriptionHistory(@Req() req: RequestWithUser) {
    const userId = req.user.userId;
    return this.subscriptionService.findUserSubscriptionHistory(userId);
  }
}
