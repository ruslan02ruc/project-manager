import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PusherService } from 'src/pusher/pusher.service'

import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'

@Module({
	controllers: [CommentController],
	providers: [CommentService, PrismaService, PusherService]
})
export class CommentModule {}
