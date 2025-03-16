import { UserRole } from '@prisma/client'
import {
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	MinLength
} from 'class-validator'

export class UpdateUserDto {
	@IsString()
	name: string

	@IsEmail()
	email: string

	@IsEnum(UserRole)
	role: UserRole
}
