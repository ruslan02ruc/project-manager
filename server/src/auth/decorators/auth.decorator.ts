import { applyDecorators, UseGuards } from '@nestjs/common'
import { TypeRole } from 'src/auth/auth.interface'
import { OnlyAdminGuard } from 'src/auth/guard/admin.guard'
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard'

export function Auth(role: TypeRole = 'user') {
	return applyDecorators(
		role === 'admin'
			? UseGuards(JwtAuthGuard, OnlyAdminGuard)
			: UseGuards(JwtAuthGuard)
	)
}
