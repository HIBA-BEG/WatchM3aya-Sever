import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyMultipart from '@fastify/multipart';

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  await app.register(fastifyMultipart, {
    limits: {
      fileSize: 1000 * 1024 * 1024,  
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
