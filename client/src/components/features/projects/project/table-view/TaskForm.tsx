import { zodResolver } from '@hookform/resolvers/zod'
import { Popover } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/common/Button'
import { Calendar } from '@/components/ui/common/Calendar'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/common/Dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/common/Form'
import { Input } from '@/components/ui/common/Input'
import { PopoverContent, PopoverTrigger } from '@/components/ui/common/Popover'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/common/Select'

import { useTask } from '@/hooks/task/useTask'
import { useUpdateTask } from '@/hooks/task/useUpdateTask'

import { Priority, Status } from '@/libs/enums'
import { cn } from '@/libs/utils'
import {
	TypeUpdateTaskSchema,
	updateTaskSchema
} from '@/schemas/task/update-task.schema'

interface ITaskForm {
	id: string
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
}

export default function TaskForm({ id, isOpen, setIsOpen }: ITaskForm) {
	const [shouldFetch, setShouldFetch] = useState(false)
	const { data, refetch } = useTask(id)
	const { updateTask } = useUpdateTask()

	const form = useForm<TypeUpdateTaskSchema>({
		resolver: zodResolver(updateTaskSchema),
		defaultValues: {
			title: '',
			description: '',
			status: Status.TODO,
			priority: Priority.LOW,
			isArchive: false,
			startTime: new Date(),
			endTime: new Date()
		},
		mode: 'onChange'
	})

	useEffect(() => {
		if (isOpen && id) {
			setShouldFetch(true)
			refetch()
		} else {
			setShouldFetch(false)
		}
	}, [isOpen, id, refetch])

	useEffect(() => {
		if (data?.data) {
			form.reset(data.data)
		}
	}, [data, form])

	const onSubmit = async (data: TypeUpdateTaskSchema) => {
		try {
			await updateTask({ id, data })
			setIsOpen(false)
			form.reset()
		} catch (error) {
			toast.error(`Ошибка при обновлении задачи: ${error}`)
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className='lg:!w-3/7 !w-full !max-w-none sm:!w-1/2'>
				<DialogHeader>
					<DialogTitle>
						{data?.data?.title || 'Редактирование задачи'}
					</DialogTitle>
					<DialogDescription>Внесите изменения в задачу</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4'
						>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Название</FormLabel>
										<FormControl>
											<Input placeholder='Название' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Описание</FormLabel>
										<FormControl>
											<Input placeholder='Описание' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='status'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Статус</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Статус' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(Status).map(status => (
													<SelectItem key={status} value={status}>
														{status}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='priority'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Приоритет</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Приоритет' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(Priority).map(priority => (
													<SelectItem
														key={priority}
														value={priority}
													>
														{priority}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='startTime'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>Дата начала</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={'outline'}
														className={cn(
															'w-[240px] pl-3 text-left font-normal',
															!field.value &&
																'text-muted-foreground'
														)}
													>
														{field.value ? (
															format(field.value, 'PPP')
														) : (
															<span>Выберите дату</span>
														)}
														<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className='w-auto p-0'
												align='start'
											>
												<Calendar
													initialFocus
													mode='single'
													defaultMonth={
														field.value ? new Date(field.value) : undefined
													}
													selected={
														field.value
															? new Date(field.value)
															: new Date(2022, 0, 20)
													}
													onSelect={field.onChange}
													numberOfMonths={1}
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='endTime'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>Дата конца</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={'outline'}
														className={cn(
															'w-[240px] pl-3 text-left font-normal',
															!field.value &&
																'text-muted-foreground'
														)}
													>
														{field.value ? (
															format(field.value, 'PPP')
														) : (
															<span>Выберите дату</span>
														)}
														<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className='w-auto p-0'
												align='start'
											>
												<Calendar
													initialFocus
													mode='single'
													defaultMonth={
														field.value ? new Date(field.value) : undefined
													}
													selected={
														field.value
															? new Date(field.value)
															: new Date(2022, 0, 20)
													}
													onSelect={field.onChange}
													numberOfMonths={1}
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit' className='cursor-pointer'>
								Сохранить
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}
