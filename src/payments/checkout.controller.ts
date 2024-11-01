import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StripeService } from './stripe.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly stripeService: StripeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('session')
  async createCheckoutSession(
    @Body() data: { productId: string; priceId: string },
    @Req() req: Request,
  ) {
    const userId = (req.user as any)?.userId;
    if (!userId) {
      throw new Error('User ID not found in request');
    }

    return this.stripeService.createCheckoutSession(
      data.productId,
      data.priceId,
      userId,
    );
  }

  @Get('success')
  async handleSuccess(
    @Query('session_id') sessionId: string,
    @Res() res: Response,
  ) {
    res.send('Ödeme başarılı! Abonelik etkinleştirildi.');
  }

  @Get('cancel')
  async handleCancel(@Res() res: Response) {
    res.send('Ödeme iptal edildi.');
  }
}
