import { Injectable } from '@nestjs/common'
import * as Pusher from 'pusher'

@Injectable()
export class PusherService {
	private pusher: Pusher

	constructor() {
		this.pusher = new Pusher({
			appId: '1962315',
			key: '711384b4a91a92361e7e',
			secret: 'f72738b6d1c5c0026ac9',
			cluster: 'eu'
			// useTLS: true
		})
	}

	trigger(channel: string, event: string, data: any) {
		return this.pusher.trigger(channel, event, data)
	}
}
