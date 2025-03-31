'use client'

import { useQueryClient } from '@tanstack/react-query'
import Pusher from 'pusher-js'
import { useEffect } from 'react'

import { useProfile } from '../useProfile'

export const usePusherComments = () => {
	const { user } = useProfile()
	const queryClient = useQueryClient()

	useEffect(() => {
		if (!user?.id) return

		const pusher = new Pusher('711384b4a91a92361e7e', {
			cluster: 'eu',
			// forceTLS: true
		})

		const channel = pusher.subscribe(`user-${user.id}`)

		channel.bind('comment_data', (data: any) => {
			console.log('🔥 Комментарий получен:', data)
			queryClient.invalidateQueries({ queryKey: ['comments'] })
		})

		return () => {
			channel.unbind_all()
			channel.unsubscribe()
			pusher.disconnect()
		}
	}, [user?.id])
}
