import { Metadata } from 'next'

import Project from '@/components/features/projects/project/Project'

import { IPageIdParam } from '@/types/page-params.types'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Проект',
	...NO_INDEX_PAGE
}

export default async function ProjectPage({ params }: IPageIdParam) {
	return <Project projectId={params.id} />
}
