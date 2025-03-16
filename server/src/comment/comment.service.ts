import { Injectable, NotFoundException } from '@nestjs/common'
import { ActivityAction } from '@prisma/client'

import { PrismaService } from '../prisma.service'

import { UpdateCommentDto } from './dto/update-comment.dto'
import { returnCommentObject } from './return-comment.object'

@Injectable()
export class CommentService {
	constructor(private prisma: PrismaService) {}

	async getById(id: string) {
		const comment = await this.prisma.comment.findUnique({
			where: {
				id: id
			},
			select: returnCommentObject
		})
		if (!comment) throw new NotFoundException('Комментарий не найден')

		return comment
	}

	async create(userId: string, taskId: string) {
		const comment = await this.prisma.comment.create({
			data: {
				message: '',
				task: {
					connect: {
						id: taskId
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
		//
		// await this.prisma.commentLog.create({
		//   data: {
		//     userId,
		//     commentId: comment.id,
		//     action: ActivityAction.CREATE,
		//   },
		// });

		return comment.id
	}

	async replyToComment(commentId: string, userId: string) {
		const parentComment = await this.prisma.comment.findUnique({
			where: {
				id: commentId
			}
		})
		if (!parentComment) throw new NotFoundException('Комментарий не найден')

		const comment = await this.prisma.comment.create({
			data: {
				message: '',
				task: {
					connect: {
						id: parentComment.taskId
					}
				},
				user: {
					connect: {
						id: parentComment.userId
					}
				},
				parent: {
					connect: {
						id: commentId
					}
				}
			}
		})
		//
		// await this.prisma.commentLog.create({
		//   data: {
		//     userId,
		//     commentId: comment.id,
		//     action: ActivityAction.CREATE,
		//   },
		// });

		return comment.id
	}

	async update(id: string, dto: UpdateCommentDto, userId: string) {
		const oldComment = await this.prisma.comment.findUnique({
			where: { id },
			select: { id: true }
		})
		if (!oldComment) throw new NotFoundException('Комментарий не найден')

		const updatedComment = await this.prisma.comment.update({
			where: { id },
			data: {
				message: dto.message
			}
		})
		//
		// await this.prisma.commentLog.create({
		//   data: {
		//     userId,
		//     commentId: id,
		//     action: ActivityAction.UPDATE,
		//     details: { before: oldComment, after: updatedComment },
		//   },
		// });

		return updatedComment
	}

	async delete(id: string, userId: string) {
		const comment = await this.prisma.comment.delete({
			where: {
				id
			}
		})
		//
		// await this.prisma.commentLog.create({
		//   data: {
		//     userId,
		//     commentId: id,
		//     action: ActivityAction.DELETE
		//   },
		// });

		return comment
	}
}
