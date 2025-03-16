import { z } from 'zod'

import { Priority, Status } from '@/libs/enums'

export const updateTaskSchema = z.object({
	title: z.string().min(1, {
		message: 'Пожалуйста введите название минимально 1 символов'
	}),
	description: z.string().optional(),
	status: z.nativeEnum(Status),
	priority: z.nativeEnum(Priority),
	isArchive: z.boolean().optional(),
	startTime: z.date().optional(),
	endTime: z.date().optional()
})

export type TypeUpdateTaskSchema = z.infer<typeof updateTaskSchema>
