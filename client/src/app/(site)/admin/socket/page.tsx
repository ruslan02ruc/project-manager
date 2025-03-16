'use client'

import { useState } from 'react'

import SocketApi from '@/api/socket-api'

import { Button } from '@/components/ui/common/Button'
import { Input } from '@/components/ui/common/Input'

import { useConnectSocket } from '@/hooks/useConnectSocket'

export default function SocketPage() {
	const [text, setText] = useState('')
	useConnectSocket()

	const sendMessage = () => {
		SocketApi.socket?.emit('server-path', { text })
	}

	return (
		<div>
			<h1>WebScoket</h1>

			<div>
				<Input
					type='text'
					value={text}
					onChange={e => setText(e.currentTarget.value)}
				/>
				<Button onClick={sendMessage}>Send</Button>
			</div>
		</div>
	)
}
