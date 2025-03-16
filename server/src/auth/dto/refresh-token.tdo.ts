import { IsString } from 'class-validator'

export class RefreshTokenTdo {
	@IsString({
		message: 'Вы не передали refresh токен или это не строка!'
	})
	refreshToken: string
}
