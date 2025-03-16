import { Status } from '@prisma/client'
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'

export class ProjectDto {
	@IsString({
		message: 'Название обязательно'
	})
	title: string

	@IsString()
	@IsOptional()
	description: string

	@IsEnum(Status)
	status: Status = Status.TODO

	@IsBoolean()
	isArchive: boolean = false
}
