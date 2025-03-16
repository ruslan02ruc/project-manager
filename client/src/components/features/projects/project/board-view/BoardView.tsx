import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/common/Button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/common/Card'

import { useTasks } from '@/hooks/task/useTasks'

import BoardItem from './BoardItem'
import { Status } from '@/libs/enums'

interface IProject {
	projectId: string
}
export default function BoardView({ projectId }: IProject) {
	const { data } = useTasks(projectId)

	// data?.data?.map(task => console.log(task))

	return (
		<div className='grid grid-cols-5 gap-x-4'>
			{Object.values(Status).map(status => (
				<Card className='justify-between gap-4'>
					<CardHeader>
						<CardTitle>Card {status}</CardTitle>
					</CardHeader>
					<CardContent className='px-2'>
						<BoardItem data={data?.data || []} columStatus={status} />
					</CardContent>
					<CardFooter>
						<Button className='w-full'>
							<Plus /> Создать
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	)
}
