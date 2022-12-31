import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    allowedHeaders: '*'
  });
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Chatbot Nestjs Backend')
    .setDescription('Chatbot Nestjs Backend')
    .setVersion('1.0')
    .addTag('digital')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port: string = process.env.PORT || '3100';
  await app.listen(port);
}
bootstrap();
