'use client'

import { useStrangerProjects } from '@/hooks/project/useStrangerProjects'

import Projects from './Projects'

export default function ClientStrangerProjects() {
	const { data } = useStrangerProjects()

	return <Projects data={data || []} />
}
