import { Socket, io } from 'socket.io-client'

import { SERVER_URL } from '@/libs/constants/api.constants'

export class SocketApi {
	static socket: null | Socket = null

	static createConnection() {
		this.socket = io(SERVER_URL)

		this.socket.on('connect', () => {
			console.log('connected')
		})

		this.socket.on('disconnect', e => {
			console.log('disconnected')
		})
	}
}

export default SocketApi
