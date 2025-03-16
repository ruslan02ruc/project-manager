import type { Metadata } from 'next'
import Link from 'next/link'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'
import { ADMIN_URL } from '@/libs/constants/url.constants'

export const metadata: Metadata = {
	title: 'Страница не существует!',
	...NO_INDEX_PAGE
}

export default function NotFoundPage() {
	return (
		<div className='flex h-[100vh] w-full items-center gap-y-4'>
			<div className='flex w-full flex-col items-center gap-y-4'>
				<h1 className='text-destructive text-3xl'>
					404. Страница не найдена
				</h1>
				<p>Хм, похоже, эта страница не существует.</p>
				<Link
					href={ADMIN_URL.root()}
					className='text-primary underline-offset-4 hover:underline'
				>
					Перейти на главную
				</Link>
			</div>
		</div>
	)
}
