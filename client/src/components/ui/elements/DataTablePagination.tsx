import { Table } from '@tanstack/react-table'
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight
} from 'lucide-react'

import { Button } from '@/components/ui/common/Button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/common/Select'

interface DataTablePaginationProps<TData> {
	table: Table<TData>
}

export function DataTablePagination<TData>({
	table
}: DataTablePaginationProps<TData>) {
	return (
		<div className='flex items-center justify-between px-2'>
			<div className='text-muted-foreground flex-1 text-sm'>
				{table.getFilteredSelectedRowModel().rows.length} из{' '}
				{table.getFilteredRowModel().rows.length} выбран(ы) строки.
			</div>
			<div className='flex items-center space-x-6 lg:space-x-8'>
				<div className='flex items-center space-x-2'>
					<p className='text-sm font-medium'>Строк на странице</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={value => {
							table.setPageSize(Number(value))
						}}
					>
						<SelectTrigger className='h-8 w-[70px]'>
							<SelectValue
								placeholder={table.getState().pagination.pageSize}
							/>
						</SelectTrigger>
						<SelectContent side='top'>
							{[10, 20, 30, 40, 50].map(pageSize => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex w-[100px] items-center justify-center whitespace-nowrap text-sm font-medium'>
					Страница {table.getState().pagination.pageIndex + 1} из{' '}
					{table.getPageCount()}
				</div>
				<div className='flex items-center space-x-2'>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex'
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>Перейти на первую страницу</span>
						<ChevronsLeft />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>
							Перейти на предыдущую страницу
						</span>
						<ChevronLeft />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>Перейти к следующей странице</span>
						<ChevronRight />
					</Button>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex'
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>Перейти к последней странице</span>
						<ChevronsRight />
					</Button>
				</div>
			</div>
		</div>
	)
}
