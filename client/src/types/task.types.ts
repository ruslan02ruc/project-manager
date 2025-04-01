export interface ITask {
	id: string
	title: string
	description?: string
	status: string
	priority: string
	startTime?: string
	endTime?: string
	isArchive?: boolean
	projectId: string
	userId: string
	// task: ITask
	// subtasks: ITask[]
	// comments: IComment[]
}
