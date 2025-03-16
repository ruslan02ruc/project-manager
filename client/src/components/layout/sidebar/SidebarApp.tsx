'use client'

import {
	AlignJustify,
	Bell,
	BookCheck,
	ChartNoAxesCombined,
	Folder,
	LayoutDashboard,
	MessageSquare
} from 'lucide-react'
import * as React from 'react'

import { Logo } from '@/components/layout/header/Logo'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail
} from '@/components/ui/common/Sidebar'

import { MainNav } from './MainNav'
import { UserNav } from './UserNav'
import { ADMIN_URL } from '@/libs/constants/url.constants'

const data = [
	{
		title: 'Главная',
		url: ADMIN_URL.root(),
		icon: LayoutDashboard
	},
	{
		title: 'Статистика',
		url: ADMIN_URL.statistics(),
		icon: ChartNoAxesCombined
	},
	{
		title: 'Мои проекты',
		url: ADMIN_URL.projects(),
		icon: Folder,
		items: [
			{
				title: 'Проект 1',
				url: '#'
			},
			{
				title: 'Проект 2',
				url: '#'
			},
			{
				title: 'Проект 3',
				url: '#'
			}
		]
	},
	{
		title: 'Личные чаты',
		url: '#', //FIXME: нету URL
		icon: MessageSquare,
		items: [
			{
				title: 'чат 1',
				url: '#'
			}
		]
	},
	{
		title: 'Мои Задачи',
		url: ADMIN_URL.tasks(),
		icon: BookCheck
	},
	{
		title: 'Чужие задачи',
		url: ADMIN_URL.tasks(), //FIXME: нету URL
		icon: AlignJustify
	},
	{
		title: 'Уведомления',
		url: '#', //FIXME: нету URL
		icon: Bell
	}
]

export function SidebarApp({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<Logo />
			</SidebarHeader>
			<SidebarContent>
				<MainNav data={data} />
				{/* <ProjectsNav projects={data.projects} /> */}
			</SidebarContent>
			<SidebarFooter>
				<UserNav />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
