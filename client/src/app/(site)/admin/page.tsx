import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Админ панель',
	...NO_INDEX_PAGE
}

export default function AdminPage() {
	return <div className='px-6'>Home</div>
}
