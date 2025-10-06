import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend connection
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' 
      ? [process.env.CORS_ORIGIN, 'https://your-app.vercel.app'] 
      : ['http://localhost:3000', 'http://localhost:5173'], // React dev servers
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true 
    })
  );

  // Dynamic port for Render
  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`Backend running on port ${port}`);
}
bootstrap();
