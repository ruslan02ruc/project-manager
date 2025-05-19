import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TelegramModule } from 'src/telegram/telegram.module'
import { TelegramService } from 'src/telegram/telegram.service'

import { ProjectController } from './project.controller'
import { ProjectService } from './project.service'

@Module({
	imports: [TelegramModule],
	controllers: [ProjectController],
	providers: [ProjectService, PrismaService, TelegramService]
})
export class ProjectModule {}
