import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'

import { JwtAuthGuard } from '../auth/guard/jwt.guard'
import { CurrentUser } from '../user/decorators/user.decorator'

import { CommentService } from './comment.service'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Controller('comments')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.commentService.getById(id)
	}

	@Post(':id')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	async create(
		@CurrentUser('id') userId: string,
		@Param('id') taskId: string
	) {
		return this.commentService.create(userId, taskId)
	}

	@Post('reply/:id')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	async replyToComment(
		@Param('id') commentId: string,
		@CurrentUser('id') userId: string
	) {
		return this.commentService.replyToComment(commentId, userId)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	async update(
		@Param('id') id: string,
		@Body() dto: UpdateCommentDto,
		@CurrentUser('id') userId: string
	) {
		const updatedProject = await this.commentService.update(id, dto, userId)

		if (!updatedProject) throw new NotFoundException('Комментарий не найден')
		return updatedProject
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
		const deletedProject = await this.commentService.delete(id, userId)

		if (!deletedProject) throw new NotFoundException('Комментарий не найден')
		return deletedProject
	}
}
