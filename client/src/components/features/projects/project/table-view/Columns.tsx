'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/components/ui/common/Avatar'
import { Button } from '@/components/ui/common/Button'
import { Checkbox } from '@/components/ui/common/Checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/common/DropdownMenu'
import { DataTableColumnHeader } from '@/components/ui/elements/DataTableColumnHeader'
import { DatePicker } from '@/components/ui/elements/DatePicker'

import { ITask } from '@/types/task.types'

import { useUser } from '@/hooks/user/useUser'
import { Priorities, StatusOptions } from '@/libs/enums'
import TaskForm from './TaskForm'

export const columns: ColumnDef<ITask>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'title',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Название' />
		),
		meta: {
			filterVariant: 'toggle'
		}
	},
	{
		accessorKey: 'description',
		header: 'Описание'
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Статус'
				selectEnum={StatusOptions}
			/>
		),
		meta: {
			filterVariant: 'select'
		}
	},
	{
		accessorKey: 'priority',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Приоритет'
				selectEnum={Priorities}
			/>
		),
		meta: {
			filterVariant: 'select'
		}
	},
	{
		id: 'time',
		header: () => <>Срок</>,
		cell: ({ row }) => {
			const { startTime, endTime } = row.original
			return (
				<div className='max-w-32'>
					<DatePicker initialFrom={startTime} initialTo={endTime} />
				</div>
			)
		}
	},
	{
		accessorKey: 'user',
		header: 'Исполнитель',
		cell: ({ row }) => {
			const { userId } = row.original
			const { data } = useUser(userId)
			return userId ? (
				<div className='flex items-center space-x-2'>
					<Avatar className='outline-ring cursor-pointer hover:outline-2 hover:outline-offset-2'>
						<AvatarImage src={data?.data.avatar} alt={data?.data.email} />
						<AvatarFallback className='text-xs'>
							{data?.data.email}
						</AvatarFallback>
					</Avatar>
					<p>{data?.data.name}</p>
				</div>
			) : (
				<p>Не назначен</p>
			)
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const task = row.original
			const [isOpen, setIsOpen] = useState(false)

			return (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='h-8 w-8 p-0'>
								<span className='sr-only'>Open menu</span>
								<MoreHorizontal className='h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Действия</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(task.id)}
							>
								Скопировать ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => setIsOpen(true)}>
								Просмотр проекта
							</DropdownMenuItem>
							<DropdownMenuItem>В архив</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<TaskForm id={task.id} isOpen={isOpen} setIsOpen={setIsOpen} />
				</>
			)
		}
	}
]
