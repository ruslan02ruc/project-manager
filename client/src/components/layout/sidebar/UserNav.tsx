'use client'

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	Computer,
	LogOut,
	Moon,
	Settings,
	Sun,
	SunMoon
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/components/ui/common/Avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from '@/components/ui/common/DropdownMenu'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar
} from '@/components/ui/common/Sidebar'
import { Skeleton } from '@/components/ui/common/Skeleton'

import { useProfile } from '@/hooks/useProfile'

import { removeFromStorage } from '@/services/auth/auth-token.service'

import { PUBLIC_URL } from '@/libs/constants/url.constants'

export function UserNav() {
	const { isMobile } = useSidebar()
	const { user, isLoading } = useProfile()
	const { push } = useRouter()
	const { setTheme } = useTheme()

	const logout = () => {
		removeFromStorage()
		push(PUBLIC_URL.auth())
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer'
						>
							{isLoading ? (
								<div className='flex items-center space-x-2'>
									<Skeleton className='h-8 w-8 rounded-lg' />
									<div className='space-y-2'>
										<Skeleton className='h-3 w-[100px]' />
										<Skeleton className='h-3 w-[120px]' />
									</div>
								</div>
							) : (
								<>
									<Avatar className='h-8 w-8 rounded-lg'>
										<AvatarImage
											src={user?.avatarPath}
											alt={user?.name}
										/>
										<AvatarFallback className='rounded-lg'>
											{user?.name}
										</AvatarFallback>
									</Avatar>
									<div className='grid flex-1 text-left text-sm leading-tight'>
										<span className='truncate font-medium'>
											{user?.name}
										</span>
										<span className='truncate text-xs'>
											{user?.email}
										</span>
									</div>
								</>
							)}
							<ChevronsUpDown className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					{isLoading === false && (
						<DropdownMenuContent
							className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
							side={isMobile ? 'bottom' : 'right'}
							align='end'
							sideOffset={4}
						>
							<DropdownMenuLabel className='p-0 font-normal'>
								<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
									<Avatar className='h-8 w-8 rounded-lg'>
										<AvatarImage
											src={user?.avatarPath}
											alt={user?.name}
										/>
										<AvatarFallback className='rounded-lg'>
											CN
										</AvatarFallback>
									</Avatar>
									<div className='grid flex-1 text-left text-sm leading-tight'>
										<span className='truncate font-medium'>
											{user?.name}
										</span>
										<span className='truncate text-xs'>
											{user?.email}
										</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<BadgeCheck />
									Account
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Settings />
									Settings
								</DropdownMenuItem>
								{/* <DropdownMenu>
									<DropdownMenuTrigger asChild>
										<DropdownMenuItem>
											<SunMoon />
											Тема
										</DropdownMenuItem>
									</DropdownMenuTrigger>
									<DropdownMenuContent align='end' side='right'>
										<DropdownMenuItem
											onClick={() => setTheme('light')}
										>
											Light
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => setTheme('dark')}
										>
											Dark
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => setTheme('system')}
										>
											System
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu> */}

								{/* <DropdownMenuGroup>
									<DropdownMenuSub>
										<DropdownMenuSubTrigger>
											<DropdownMenuItem>
												<SunMoon />
												Тема
											</DropdownMenuItem>
										</DropdownMenuSubTrigger>
										<DropdownMenuPortal>
											<DropdownMenuSubContent>
												<DropdownMenuItem
													onClick={() => setTheme('light')}
												>
													<Sun />
													<span>Light</span>
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() => setTheme('dark')}
												>
													<Moon />
													<span>Dark</span>
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem
													onClick={() => setTheme('System')}
												>
													<Computer />
													<span>System</span>
												</DropdownMenuItem>
											</DropdownMenuSubContent>
										</DropdownMenuPortal>
									</DropdownMenuSub>
									<DropdownMenuSeparator />
								</DropdownMenuGroup>
								 */}

								<DropdownMenuSub>
									<DropdownMenuSubTrigger className='[&_svg]:text-muted-foreground flex gap-2 [&_svg]:size-4'>
										<SunMoon />
										<span>Тема</span>
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuItem
												onClick={() => setTheme('light')}
											>
												<Sun />
												<span>Light</span>
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => setTheme('dark')}
											>
												<Moon />
												<span>Dark</span>
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem
												onClick={() => setTheme('system')}
											>
												<Computer />
												<span>System</span>
											</DropdownMenuItem>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>

								<DropdownMenuItem>
									<Bell />
									Notifications
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => logout()}>
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					)}
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
