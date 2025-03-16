import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { PrismaService } from '../prisma.service'

import { WebhookController } from './webhook.controller'
import { WebhookService } from './webhook.service'

@Module({
	imports: [HttpModule],
	controllers: [WebhookController],
	providers: [WebhookService, PrismaService]
})
export class WebhookModule {}
