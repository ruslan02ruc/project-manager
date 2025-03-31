import { Module } from '@nestjs/common'
import { PusherModule } from 'src/pusher/pusher.module'

import { PrismaService } from '../prisma.service'

import { TaskController } from './task.controller'
import { TaskService } from './task.service'

@Module({
	imports: [PusherModule],
	controllers: [TaskController],
	providers: [TaskService, PrismaService]
})
export class TaskModule {}
