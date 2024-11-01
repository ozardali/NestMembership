import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscriptions.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async getUserSubscriptions(userId: number): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      where: { user: { id: userId }, status: 'active' },
      relations: ['user'],
    });
  }
  async findUserSubscriptionHistory(userId: number): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      where: { user: { id: userId } },
      order: { startDate: 'DESC' },
      relations: ['user'],
    });
  }

  async findAllSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      relations: ['user'],
    });
  }

  async getUserSubscriptionHistory(userId: number): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      where: { user: { id: userId } },
      order: { startDate: 'DESC' },
      relations: ['user'],
    });
  }
}
