import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.enableCors()

	await app.listen(4200)

	// const session = await new SessionBuilder().authtokenFromEnv().connect()
	// const listener = await session.httpEndpoint().listen()
	// new Logger('main').log(`Ingress established at ${listener.url()}`)
	// listener.forward(`localhost:${4200}`)
}
bootstrap()
