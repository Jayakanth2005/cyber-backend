import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Simplified for now

  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true 
    })
  );

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Backend running on port ${port}`);
}
bootstrap();