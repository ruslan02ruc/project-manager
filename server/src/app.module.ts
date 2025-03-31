import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { ChatModule } from './chat/chat.module'
import { CommentModule } from './comment/comment.module'
import { FileModule } from './file/file.module'
import { ProjectMemberModule } from './project-member/project-member.module'
import { ProjectModule } from './project/project.module'
import { PusherModule } from './pusher/pusher.module'
import { StatisticsModule } from './statistics/statistics.module'
import { TaskModule } from './task/task.module'
import { UserModule } from './user/user.module'
import { WebhookModule } from './webhook/webhook.module'
import { WebsocketModule } from './websocket/websocket.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		ProjectModule,
		TaskModule,
		ProjectMemberModule,
		CommentModule,
		FileModule,
		WebsocketModule,
		WebhookModule,
		PusherModule,
		StatisticsModule,
		ChatModule
	]
})
export class AppModule {}
