import { Metadata } from 'next'

import Projects from '@/components/features/projects/Projects'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Проекты',
	...NO_INDEX_PAGE
}

export default function ProjectsPage() {
	return <Projects />
}
