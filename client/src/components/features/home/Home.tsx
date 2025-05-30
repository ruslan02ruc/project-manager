'use client'

import { useProfile } from '@/hooks/useProfile'

export default function Home() {
	const { user } = useProfile()
	return (
		<div className='px-6'>
			<h1 className='pb-6 text-center text-3xl'>
				Добро пожаловать {user?.name}
			</h1>
			<ul className='flex list-inside list-disc flex-col gap-3 text-lg'>
				<li>
					Перейдите в «Мои проекты», чтобы создать новый проект, добавить
					участников и распределить роли. Здесь вы можете управлять
					собственными задачами, отслеживать прогресс и контролировать
					ключевые этапы работы.
				</li>
				<li>
					В разделе «Чужие проекты» отображаются проекты, в которых вы
					участвуете как приглашённый пользователь. Вы можете выполнять
					назначенные задачи, оставлять комментарии и взаимодействовать с
					другими участниками.
				</li>
				<li>
					Вкладка «Статистика» предоставляет сводную информацию о вашей
					активности: количество выполненных задач, среднее время на
					выполнение, эффективность команды и другие метрики.
				</li>
				<li>
					Используйте «Личные чаты» для оперативного общения с коллегами
					без необходимости переключаться на внешние мессенджеры.
				</li>
				<li>
					Архивируйте завершённые проекты через раздел «Архив», чтобы
					сохранить историю и в любой момент вернуться к ней при
					необходимости.
				</li>
			</ul>
		</div>
	)
}

// TODO: home нету контента
