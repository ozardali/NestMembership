import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { StripeService } from '../payments/stripe.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private stripeService: StripeService,
  ) {}

  async register(userData: {
    email: string;
    password: string;
    name: string;
    date_of_birth?: Date;
    gender?: string;
  }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userService.createUser({
      ...userData,
      password: hashedPassword,
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    if (!user.stripeCustomerId) {
      const stripeCustomerId = await this.stripeService.createStripeCustomer(
        user.email,
        user.name,
      );
      await this.userService.updateUser(user.id, { stripeCustomerId });
    }
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
