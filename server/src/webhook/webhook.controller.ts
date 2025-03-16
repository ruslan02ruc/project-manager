import { Body, Controller, Post } from '@nestjs/common'

import { WebhookService } from './webhook.service'

@Controller('webhook')
export class WebhookController {
	constructor(private readonly webhookService: WebhookService) {}

	@Post('/github')
	async handleGitHubWebhook(@Body() payload: any) {
		if (!payload.commits || payload.commits.length === 0) {
			return { message: 'No commits to save' }
		}

		console.log(payload)
		await this.webhookService.saveCommits(
			payload.commits,
			payload.repository.full_name
		)

		return { message: 'Commits saved' }
	}
}
