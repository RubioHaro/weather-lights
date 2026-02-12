import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // Solo permite tu Frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Palmetto Weather Lights API')
    .setDescription('API for controlling the Palmetto Weather Lights')
    .setVersion('0.01 Preview')
    .addTag('weather')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
