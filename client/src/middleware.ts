import { NextRequest, NextResponse } from 'next/server'

import { EnumTokens } from '@/services/auth/auth-token.service'
import { userService } from '@/services/user.service'

import { ADMIN_URL, PUBLIC_URL } from '@/libs/constants/url.constants'

export async function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value

	const isAuthPage = request.url.includes(PUBLIC_URL.auth())
	const isAdminPage = request.url.includes(ADMIN_URL.root())

	// Если пользователь есть
	if (isAuthPage) {
		if (refreshToken && accessToken) {
			return NextResponse.redirect(new URL(ADMIN_URL.root(), request.url))
		}
		return NextResponse.next()
	}

	// Если пользователь не авторизирован
	if (refreshToken === undefined) {
		return NextResponse.rewrite(
			new URL(isAdminPage ? '/404' : PUBLIC_URL.auth(), request.url)
		)
	}

	try {
		const profile = await userService.getProfileMiddleware(refreshToken)

		// // проверка на админа
		// if (profile.role === UserRole.ADMIN) {
		// 	return NextResponse.next()
		// }
		// // если админ
		// if (isAdminPage) {
		// 	return NextResponse.rewrite(new URL('/404', request.url))
		// }
		return NextResponse.next()
	} catch (error) {
		request.cookies.delete(EnumTokens.REFRESH_TOKEN)
		return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
	}
}

export const config = {
	matcher: ['/profile/:path*', '/admin/:path*', '/auth', '/']
}
