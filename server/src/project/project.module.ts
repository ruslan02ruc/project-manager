import { Module } from '@nestjs/common'

import { PrismaService } from '../prisma.service'

import { ProjectController } from './project.controller'
import { ProjectService } from './project.service'

@Module({
	controllers: [ProjectController],
	providers: [ProjectService, PrismaService]
})
export class ProjectModule {}
