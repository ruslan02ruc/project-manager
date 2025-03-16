import { IAssistant } from '@/types/assistant.types'
import { IComment } from '@/types/comment.types'
import { IProject } from '@/types/project.types'
import { ITask } from '@/types/task.types'

import { UserRole } from '@/libs/enums'

export interface IUser {
	id: string
	name: string
	email: string
	avatarPath: string
	role: UserRole
	projectsOwned: IProject[]
	projectMembers: IAssistant[]
	tasks: ITask[]
	comment: IComment[]
}

export interface IUserEditInput
	extends Pick<IUser, 'name' | 'email' | 'role'> {}
