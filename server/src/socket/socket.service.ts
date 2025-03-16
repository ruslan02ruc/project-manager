import {
	ConnectedSocket,
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway
} from '@nestjs/websockets'

@WebSocketGateway({
	core: {
		origins: '*'
	}
})

export class SocketService implements OnGatewayConnection {
	@SubscribeMessage('server-path')
	handleEvent(dto: any, @ConnectedSocket() client: any) {
		console.log(dto)

		const res = { type: 'someType', dto }
		client.emit('client-path', res)
	}

	handleConnection(client: any) {
		console.log(client)
		console.log('client connected')
	}
}
