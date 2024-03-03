import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://localhost:3000", "http://100.97.75.94:3000", "http://100.89.189.35:3000"]
  });
  const config = new DocumentBuilder()
    .setTitle('Galery API')
    .setDescription('Experiment in MongoDB')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.APP_PORT);
}
bootstrap();
