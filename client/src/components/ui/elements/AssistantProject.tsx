'use client'

import { UserPlus } from 'lucide-react'
import { useState } from 'react'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/common/Tooltip'

import { useAssistant } from '@/hooks/assistant/useAssistants'

import { Avatar, AvatarFallback, AvatarImage } from '../common/Avatar'

import { AssistantProjectModal } from './AssistantProjectModal'

interface IAssistantProject {
	id: string
}

export default function AssistantProject({ id }: IAssistantProject) {
	const { data } = useAssistant(id)
	const [open, setOpen] = useState(false)

	return (
		<div className='ml-4 flex gap-2'>
			{data?.data.map(assistant => (
				<TooltipProvider key={assistant.id}>
					<Tooltip>
						<Avatar className='outline-ring cursor-pointer hover:outline-2 hover:outline-offset-2'>
							<TooltipTrigger>
								<AvatarImage
									src={assistant.user.avatarPath}
									alt={assistant.user.name}
								/>
							</TooltipTrigger>
							<AvatarFallback className='text-xs'>
								{assistant.user.name}
							</AvatarFallback>
							<TooltipContent>
								<p>{assistant.user.name}</p>
							</TooltipContent>
						</Avatar>
					</Tooltip>
				</TooltipProvider>
			))}
			<TooltipProvider>
				<Tooltip>
					<Avatar className='outline-ring hover:outline-offset-02 flex cursor-pointer items-center justify-center bg-gray-500 hover:outline-2'>
						<TooltipTrigger>
							<UserPlus
								onClick={() => setOpen(true)}
								className='ml-1 size-6'
							/>
						</TooltipTrigger>
						<TooltipContent>
							<p>Добаить ассистента</p>
						</TooltipContent>
					</Avatar>
				</Tooltip>
			</TooltipProvider>
			<AssistantProjectModal id={id} open={open} setOpen={setOpen} />
		</div>
	)
}
