'use client'

import { ClipboardList } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/common/Button'

import AuthForm from './AuthForm'

export default function Auth() {
	const [isLoginForm, setIsLoginForm] = useState(true)

	return (
		<div className='grid min-h-svh lg:grid-cols-2'>
			<div className='flex flex-col gap-4 p-6 md:p-10'>
				<div className='flex justify-center gap-2 md:justify-start'>
					<a href='#' className='flex items-center gap-2 font-medium'>
						<div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
							<ClipboardList className='size-4' />
						</div>
						Nova Task
					</a>
				</div>
				<div className='flex flex-1 items-center justify-center'>
					<div className='w-full max-w-xs'>
						<div className='grid gap-4'>
							<div className='flex flex-col items-center gap-2 text-center'>
								<h1 className='mb-6 text-3xl font-bold'>
									{isLoginForm ? 'Войти в аккаунт' : 'Регистрация'}
								</h1>
							</div>
							<AuthForm isLoginForm={isLoginForm} />
							<div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
								<span className='bg-background text-muted-foreground relative z-10 px-2'>
									Or continue with
								</span>
							</div>
							<Button variant='outline' className='w-full'>
								<svg
									width={24}
									height={24}
									viewBox='0 0 24 24'
									className='mr-2 fill-black dark:fill-white'
								>
									<path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
								</svg>
								Войти с GitHub
							</Button>
						</div>
						<div className='mt-2 text-center text-sm'>
							{isLoginForm ? 'Еще нет аккаунта? ' : 'Уже есть аккаунт? '}
							<button
								type='button'
								onClick={() =>
									setIsLoginForm(isLoginForm ? false : true)
								}
								className='cursor-pointer font-bold'
							>
								{isLoginForm ? 'Создать аккаунт' : 'Войти в аккаунт'}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-muted hidden items-center justify-center lg:flex'>
				<img
					src='/images/logo.svg'
					width={250}
					height={250}
					alt='Авторизация'
					className='object-cover'
				/>
			</div>
		</div>
	)
}
