import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/common/Card'

import { ITask } from '@/types/task.types'

interface IBoardItem {
	data: ITask[]
	columStatus: string
}

export default function BoardItem({ data, columStatus }: IBoardItem) {
	return (
		<div className='flex flex-col gap-2'>
			{data.map(
				(task, index) =>
					task.status === columStatus && (
						<Card key={index}>
							<CardHeader>
								<CardTitle>Card {task.status}</CardTitle>
								<CardDescription>Card Description</CardDescription>
							</CardHeader>
							<CardContent>
								<p>{task.description}</p>
							</CardContent>
						</Card>
					)
			)}
		</div>
	)
}
