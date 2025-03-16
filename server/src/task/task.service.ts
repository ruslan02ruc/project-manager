import { Injectable, NotFoundException } from '@nestjs/common'
import { Priority, Prisma, Status } from '@prisma/client'

import { PrismaService } from '../prisma.service'

import { TaskDto } from './dto/task.dto'
import { GetTasksQueryDto } from './dto/task.dto.query'
import { returnTaskObject } from './return-task.object'

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	async getAll(projectId: string, query: GetTasksQueryDto) {
		const {
			title,
			status,
			priority,
			isArchive,
			startTimeFrom,
			startTimeTo,
			sortBy = 'createdAt',
			sortOrder = 'desc'
		} = query

		const where: Prisma.TaskWhereInput = {
			projectId,
			...(title && {
				title: {
					contains: title,
					mode: 'insensitive'
				}
			}),
			...(status && { status: status as Status }),
			...(priority && { priority: priority as Priority }),
			...(typeof isArchive === 'boolean' && { isArchive }),

			...(startTimeFrom || startTimeTo
				? {
						startTime: {
							...(startTimeFrom && { gte: new Date(startTimeFrom) }),
							...(startTimeTo && { lte: new Date(startTimeTo) })
						}
					}
				: {})
		}

		const orderBy: Prisma.TaskOrderByWithRelationInput = {
			[sortBy]: sortOrder
		}

		return this.prisma.task.findMany({
			where,
			orderBy
		})
	}

	async getById(id: string) {
		const task = await this.prisma.task.findUnique({
			where: {
				id: id
			},
			select: returnTaskObject
		})
		if (!task) throw new NotFoundException('Задача не найден')

		return task
	}

	async create(projectId: string, dto: TaskDto) {
		const task = await this.prisma.task.create({
			data: {
				title: dto.title,
				description: dto.description,
				startTime: dto.startTime ? new Date(dto.startTime) : null,
				endTime: dto.endTime ? new Date(dto.endTime) : null,
				project: {
					connect: {
						id: projectId
					}
				}
			}
		})
		return task.id
	}

	async subtask(taskId: string, dto: TaskDto) {
		const task = await this.prisma.task.findUnique({
			where: {
				id: taskId
			}
		})
		if (!task) throw new NotFoundException('Задача не найдена')

		const subtask = await this.prisma.task.create({
			data: {
				title: dto.title,
				description: dto.description,
				startTime: new Date(dto.startTime),
				endTime: new Date(dto.endTime),
				project: {
					connect: {
						id: task.projectId
					}
				},
				task: {
					connect: {
						id: taskId
					}
				}
			}
		})

		return subtask.id
	}

	async update(id: string, dto: TaskDto) {
		const oldTask = await this.prisma.task.findUnique({
			where: { id },
			select: { id: true }
		})
		if (!oldTask) throw new NotFoundException('Задача не найдена')

		return await this.prisma.task.update({
			where: { id },
			data: dto
		})
	}

	async delete(id: string) {
		return this.prisma.task.delete({
			where: {
				id
			}
		})
	}
}
