import {
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { RequestWithUser } from '../auth/types/request-with-user.interface';
import { User } from './user.entity';
import { plainToInstance } from 'class-transformer';
import { StripeService } from '../payments/stripe.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly stripeService: StripeService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: RequestWithUser) {
    const userId = req.user.userId;
    const user = await this.userService.findUserById(userId);
    return plainToInstance(User, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @Req() req: RequestWithUser,
    @Body()
    updateData: {
      name?: string;
      surname?: string;
      date_of_birth?: Date;
      gender?: string;
    },
  ) {
    const userId = req.user.userId;
    return this.userService.updateProfile(userId, updateData);
  }
  @UseGuards(JwtAuthGuard)
  @Get('subscription-portal')
  async getCustomerPortal(@Req() req: RequestWithUser) {
    const user = await this.userService.findUserById(req.user.userId);

    if (!user?.stripeCustomerId) {
      throw new BadRequestException(
        'Stripe customer ID not found for this user',
      );
    }

    const returnUrl = 'http://localhost:3000/account';
    return this.stripeService.createCustomerPortalSession(
      user.stripeCustomerId,
      returnUrl,
    );
  }
}