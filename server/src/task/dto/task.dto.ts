import { Priority, Status } from '@prisma/client'
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'

export class TaskDto {
	@IsString({
		message: 'Название обязательно'
	})
	title: string

	@IsString()
	@IsOptional()
	description: string

	@IsEnum(Status)
	status: Status = Status.TODO

	@IsEnum(Priority)
	priority: Priority = Priority.LOW

	@IsString()
	@IsOptional()
	startTime: string

	@IsString()
	@IsOptional()
	endTime: string

	@IsOptional()
	userId: string

	@IsBoolean()
	isArchive: boolean = false
}
