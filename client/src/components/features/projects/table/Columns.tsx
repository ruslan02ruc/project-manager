'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'

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

import { IProject } from '@/types/project.types'

import { DataTableColumnHeader } from '../../../ui/elements/DataTableColumnHeader'

import { ADMIN_URL } from '@/libs/constants/url.constants'
import { Status } from '@/libs/enums'

export const columns: ColumnDef<IProject>[] = [
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
				selectEnum={Status}
			/>
		),
		meta: {
			filterVariant: 'select'
		}
	},
	{
		accessorKey: 'owner',
		header: 'Руководитель',
		cell: ({ row }) => (
			<div className='flex items-center space-x-2'>
				<Avatar className='outline-ring cursor-pointer hover:outline-2 hover:outline-offset-2'>
					<AvatarImage
						src={row.original.owner.avatarPath}
						alt={row.original.owner.email}
					/>
					<AvatarFallback className='text-xs'>
						{row.original.owner.email}
					</AvatarFallback>
				</Avatar>
				<p>{row.original.owner.name}</p>
			</div>
		)
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const project = row.original
			const { push } = useRouter()

			return (
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
							onClick={() => navigator.clipboard.writeText(project.id)}
						>
							Скопировать ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => push(ADMIN_URL.project(project.id))}
						>
							Просмотр проекта
						</DropdownMenuItem>
						<DropdownMenuItem>В архив</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	}
]
