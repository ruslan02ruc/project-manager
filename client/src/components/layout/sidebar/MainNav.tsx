'use client'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '@radix-ui/react-collapsible'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'

import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem
} from '@/components/ui/common/Sidebar'

interface INavMain {
	data: {
		title: string
		url: string
		icon: LucideIcon
		items?: {
			title: string
			url: string
		}[]
	}[]
}

export function MainNav({ data }: INavMain) {
	return (
		<SidebarGroup>
			<SidebarMenu>
				{data.map(item => {
					return item.items ? (
						<Collapsible
							key={item.title}
							asChild
							className='group/collapsible'
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton tooltip={item.title}>
										<item.icon />
										<span>{item.title}</span>
										<ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
									</SidebarMenuButton>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub>
										<SidebarMenuSubItem>
											<SidebarMenuSubButton asChild>
												<Link href={item.url}>
													<span>Все проекты</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
										{item.items?.map(subItem => (
											<SidebarMenuSubItem key={subItem.title}>
												<SidebarMenuSubButton asChild>
													<Link href={subItem.url}>
														<span>{subItem.title}</span>
													</Link>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					) : (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<Link href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					)
				})}
			</SidebarMenu>
		</SidebarGroup>
	)
}

// export function MainNav({ data }: INavMain) {
// 	return (
// 		<SidebarGroup>
// 			<SidebarGroupLabel>Platform</SidebarGroupLabel>
// 			<SidebarMenu>
// 				{data.map(item => (
// 					<Collapsible
// 						key={item.title}
// 						asChild
// 						className='group/collapsible'
// 					>
// 						<SidebarMenuItem>
// 							<CollapsibleTrigger asChild>
// 								<SidebarMenuButton tooltip={item.title}>
// 									{item.icon && <item.icon />}
// 									<span>{item.title}</span>
// 									<ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
// 								</SidebarMenuButton>
// 							</CollapsibleTrigger>
// 							<CollapsibleContent>
// 								<SidebarMenuSub>
// 									{item.items?.map(subItem => (
// 										<SidebarMenuSubItem key={subItem.title}>
// 											<SidebarMenuSubButton asChild>
// 												<a href={subItem.url}>
// 													<span>{subItem.title}</span>
// 												</a>
// 											</SidebarMenuSubButton>
// 										</SidebarMenuSubItem>
// 									))}
// 								</SidebarMenuSub>
// 							</CollapsibleContent>
// 						</SidebarMenuItem>
// 					</Collapsible>
// 				))}
// 			</SidebarMenu>
// 		</SidebarGroup>
// 	)
// }
