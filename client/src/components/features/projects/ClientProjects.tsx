'use client'

import { useProjects } from '@/hooks/project/useProjects'

import Projects from './Projects'

export default function ClientProject() {
	const { data } = useProjects()

	return <Projects data={data || []} />
}
