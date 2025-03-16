'use client'

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/common/Tabs'

import BoardView from './board-view/BoardView'
import ListView from './list-view/ListView'
import TableView from './table-view/TableView'

interface IProject {
	projectId: string
}

export default function Project({ projectId }: IProject) {
	return (
		<Tabs defaultValue='tab-3' className='w-full'>
			<TabsList className='mb-4 grid w-full grid-cols-3 gap-6'>
				<TabsTrigger value='tab-1'>Список</TabsTrigger>
				<TabsTrigger value='tab-2'>Доска</TabsTrigger>
				<TabsTrigger value='tab-3'>Таблица</TabsTrigger>
			</TabsList>
			<TabsContent value='tab-1'>
				<ListView />
			</TabsContent>
			<TabsContent value='tab-2'>
				<BoardView projectId={projectId}  />
			</TabsContent>
			<TabsContent value='tab-3'>
				<TableView projectId={projectId} />
			</TabsContent>
		</Tabs>
	)
}
