import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebhookLog } from './webhook-log.entity';

@Injectable()
export class WebhookLogService {
  constructor(
    @InjectRepository(WebhookLog)
    private readonly webhookLogRepository: Repository<WebhookLog>,
  ) {}

  async createLog(
    eventType: string,
    payload: string,
    errorMessage: string | null = null,
  ) {
    const log = this.webhookLogRepository.create({
      eventType,
      payload,
      errorMessage: errorMessage || undefined,
    });
    await this.webhookLogRepository.save(log);
  }
}
