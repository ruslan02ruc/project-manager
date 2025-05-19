import { applyDecorators, UseGuards } from '@nestjs/common'

import { WsJwtGuard } from 'src/auth/guard/ws-jwt.guard'

export function WsAuth() {
	return applyDecorators(UseGuards(WsJwtGuard))
}
