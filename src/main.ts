import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 3333;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle("Documentation of Social Media BrotherHood(BH)")
    .setDescription("REST API Documentation of Social Media BH")
    .setVersion('0.0.1')
    .addTag("Social Media, BH, BrotherHood")
    .build()

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => console.log(`app listen on port ${PORT}`));
}
bootstrap();
