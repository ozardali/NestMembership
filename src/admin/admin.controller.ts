import {
  Controller,
  Post,
  UseGuards,
  Body,
  Put,
  Param,
  Get,
} from '@nestjs/common';
import { StripeService } from '../payments/stripe.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Role } from '../auth/role.decorator';
import { UserService } from '../users/user.service';
import { SubscriptionService } from '../subscriptions/subscription.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RoleGuard)
export class AdminController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly userService: UserService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Role('admin')
  @Get('products')
  async listProducts() {
    return this.stripeService.listProducts();
  }

  @Role('admin')
  @Post('create-product')
  async createProductAndPrice(
    @Body()
    createProductDto: {
      name: string;
      description: string;
      amount: number;
      currency: string;
      interval: 'month' | 'year';
    },
  ) {
    return this.stripeService.createProductAndPrice(
      createProductDto.name,
      createProductDto.description,
      createProductDto.amount,
      createProductDto.currency,
      createProductDto.interval,
    );
  }

  @Role('admin')
  @Put('product/:id')
  async updateProduct(
    @Param('id') productId: string,
    @Body() updateData: { name?: string; description?: string },
  ) {
    return this.stripeService.updateProduct(productId, updateData);
  }

  @Role('admin')
  @Post('product/:id/price')
  async createNewPriceForProduct(
    @Param('id') productId: string,
    @Body()
    priceData: { amount: number; currency: string; interval: 'month' | 'year' },
  ) {
    return this.stripeService.createNewPriceForProduct(
      productId,
      priceData.amount,
      priceData.currency,
      priceData.interval,
    );
  }

  @Role('admin')
  @Get('users')
  async getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Role('admin')
  @Get('subscribed-users')
  async getSubscribedUsers() {
    return this.userService.findSubscribedUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Role('admin')
  @Get('subscription-history/all')
  async getAllSubscriptions() {
    return this.subscriptionService.findAllSubscriptions();
  }

  @UseGuards(JwtAuthGuard)
  @Role('admin')
  @Get('subscription-history/:userId')
  async getUserSubscriptionHistory(@Param('userId') userId: number) {
    return this.subscriptionService.getUserSubscriptionHistory(userId);
  }
}
