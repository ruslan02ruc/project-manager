import { useQuery } from '@tanstack/react-query'

import { projectService } from '@/services/project.service'

import { ProjectQueryParams } from '@/types/project.types'

export function useProjects( params : ProjectQueryParams) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['projects', params],
		queryFn: () => projectService.getAll(params),
		staleTime: 0.2 * 60 * 1000,
	})

	return { data, isLoading, error }
}
