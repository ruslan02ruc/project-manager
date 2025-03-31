import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'

import { Auth } from '../auth/decorators/auth.decorator'

import { CurrentUser } from './decorators/user.decorator'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: string) {
		return this.userService.getById(id)
	}

	@Get()
	@Auth()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.userService.getAll(searchTerm)
	}

	@Get('by-id/:id')
	@Auth()
	async getById(@Param('id') id: string) {
		return this.userService.getById(id)
	}

	@UsePipes(new ValidationPipe())
	@Put()
	@HttpCode(200)
	@Auth()
	async update(@CurrentUser('id') id: string, @Body() dto: UpdateUserDto) {
		const updatedUser = await this.userService.update(id, dto)

		if (!updatedUser) throw new NotFoundException('Пользователь не найден')
		return updatedUser
	}

	@Delete()
	@Auth('admin')
	async delete(@CurrentUser('id') id: string) {
		const deletedUser = await this.userService.delete(id)

		if (!deletedUser) throw new NotFoundException('Пользователь не найден')
		return deletedUser
	}
}
