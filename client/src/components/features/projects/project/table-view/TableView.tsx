import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/common/Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/Dialog'
import { DataTable } from '@/components/ui/elements/DataTable'

import { useTasks } from '@/hooks/task/useTasks'

import { columns } from './Columns'
import TaskFormAdd from './TaskFormAdd'

interface IProject {
	projectId: string
}

export default function TableView({ projectId }: IProject) {
	const { data } = useTasks(projectId)

	return (
		<div className='container relative mx-auto py-10'>
			<Dialog>
				<DialogTrigger asChild>
					<Button className='absolute right-0 top-0 cursor-pointer'>
						<Plus /> Создать задачу
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Создать задачу</DialogTitle>
						<DialogDescription>Создать новую задачу</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<TaskFormAdd  id={projectId}/>
					</div>
				</DialogContent>
			</Dialog>
			<DataTable columns={columns} data={data?.data || []} id={projectId} />
		</div>
	)
}
