import { Module } from '@nestjs/common'

import { PrismaService } from '../prisma.service'

import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'

@Module({
	controllers: [CommentController],
	providers: [CommentService, PrismaService]
})
export class CommentModule {}
