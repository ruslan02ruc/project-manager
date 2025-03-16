import { Prisma } from '@prisma/client'

export const returnProjectObject: Prisma.ProjectSelect = {
	id: true,
	createdAt: true,
	title: true,
	description: true,
	status: true,
	owner: true,
	tasks: true,
	isArchive: true
}
