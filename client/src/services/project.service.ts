import { axiosWithAuth } from '@/api/interceptors'

import { IProject, ProjectQueryParams } from '@/types/project.types'

import { API_URL } from '@/libs/constants/api.constants'
import { TypeCreateTaskSchema } from '@/schemas/task/create-task.schema'


class ProjectService {
	async getAll(params?: ProjectQueryParams) {
		const { data } = await axiosWithAuth.get<IProject[]>(
			API_URL.projects(''),
			{
				params
			}
		)
		return data
	}

	async getById(id: string) {
		const { data } = await axiosWithAuth.get<IProject>(
			API_URL.projects(`/by-id/${id}`)
		)

		return data
	}

	async create(data: TypeCreateTaskSchema) {
		return axiosWithAuth.post<string>(API_URL.projects(''), data)
	}

	async update(id: string, data: TypeCreateTaskSchema) {
		return axiosWithAuth.put<string>(API_URL.projects(`/${id}`), data)
	}

	async delete(id: string) {
		return axiosWithAuth.delete<string>(API_URL.projects(`/${id}`))
	}
}

export const projectService = new ProjectService()
