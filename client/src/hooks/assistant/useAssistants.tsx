import { useQuery } from '@tanstack/react-query'

import { assistantService } from '@/services/assistant.service'

export function useAssistant(id: string) {
	const { data, isLoading } = useQuery({
		queryKey: ['assistants'],
		queryFn: () => assistantService.getAll(id),
		enabled: !!id
	})

	return { data, isLoading }
}
