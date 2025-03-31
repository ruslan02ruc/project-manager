'use client'

import { ColumnDef } from '@tanstack/react-table'
import {
	CircleCheck,
	ClipboardCheck,
	LoaderCircle,
	MoreHorizontal,
	ScanSearch,
	ShieldBan
} from 'lucide-react'
import Link from 'next/link'
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

import { useUser } from '@/hooks/user/useUser'

import { ITask } from '@/types/task.types'

import TaskForm from './TaskForm'
import { ADMIN_URL } from '@/libs/constants/url.constants'
import { Priorities } from '@/libs/enums'

export const SOptions = [
	{
		icon: ClipboardCheck,
		label: 'В работе',
		value: 'TODO'
	},
	{
		icon: LoaderCircle,
		label: 'В процессе',
		value: 'IN_PROGRESS'
	},
	{
		icon: ScanSearch,
		label: 'В процессе рассмотрения',
		value: 'REVIEW'
	},
	{
		icon: CircleCheck,
		label: 'Сделано',
		value: 'DONE'
	},
	{
		icon: ShieldBan,
		label: 'Блокированно',
		value: 'BLOCKED'
	}
]

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
		},
		cell: ({ row }) => (
			<Link href={ADMIN_URL.project(row.original.id)}>
				{row.original.title}
			</Link>
		)
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
				selectEnum={SOptions}
			/>
		),
		meta: {
			filterVariant: 'select'
		},
		cell: ({ row }) => {
			const { status } = row.original
			return (
				<div className='flex items-center space-x-2'>
					{(() => {
						const Icon = SOptions.find(
							option => option.value === status
						)?.icon
						return Icon ? <Icon className='size-5' /> : null
					})()}
					<p>{SOptions.find(option => option.value === status)?.label}</p>
				</div>
			)
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
		},
		cell: ({ row }) => {
			const { priority } = row.original
			return (
				<div className='flex items-center space-x-2'>
					{(() => {
						const Icon = Priorities.find(
							option => option.value === priority
						)?.icon
						return Icon ? <Icon className='size-5' /> : null
					})()}
					<p>
						{Priorities.find(option => option.value === priority)?.label}
					</p>
				</div>
			)
		}
	},
	{
		id: 'time',
		header: 'Срок',
		cell: ({ row }) => {
			const { startTime, endTime } = row.original
			const fromDate = startTime ? new Date(startTime) : undefined
			const toDate = endTime ? new Date(endTime) : undefined
			return (
				<div className='max-w-32'>
					<DatePicker initialFrom={fromDate} initialTo={toDate} />
				</div>
			)
		}
	},
	{
		accessorKey: 'user',
		header: 'Исполнитель',
		cell: ({ row }) => {
			const { data } = useUser(row.original.userId)

			return data ? (
				<div className='flex items-center space-x-2'>
					<Avatar className='outline-ring cursor-pointer hover:outline-2 hover:outline-offset-2'>
						<AvatarImage src={data.data.avatar} alt={data.data.email} />
						<AvatarFallback className='text-xs'>
							{data.data.email}
						</AvatarFallback>
					</Avatar>
					<p>{data.data.name}</p>
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
								Просмотр задачи
							</DropdownMenuItem>
							<DropdownMenuItem>В архив</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<TaskForm
						id={task.id}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						projectId={task.projectId}
					/>
				</>
			)
		}
	}
]
