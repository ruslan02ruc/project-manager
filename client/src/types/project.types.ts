import { IAssistant } from '@/types/assistant.types'
import { ITask } from '@/types/task.types'
import { IUser } from '@/types/user.types'

export interface IProject {
	id: string
	title: string
	description?: string
	status: string
	isArchive: boolean
	owner: IUser
	tasks: ITask[]
	projectMembers: IAssistant[]
}

export interface ProjectQueryParams {
	searchTerm?: string
	sortBy?: string
	sortOrder?: 'asc' | 'desc'
	status?: string
	isArchive?: boolean
}
