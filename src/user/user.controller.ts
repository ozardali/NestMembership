import { Controller, Get, Put, Req, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { RequestWithUser } from '../auth/types/request-with-user.interface';
import { User } from './user.entity';
import { plainToClass } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: RequestWithUser) {
    const userId = req.user.userId;
    const user = await this.userService.findUserById(userId);
    return plainToClass(User, user);
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
}
