import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Job } from './jobs/entities/job.entity'; // <-- ADD THIS IMPORT

// Helper function to sleep for a specified duration
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function connectWithRetry(dataSource: DataSource, maxRetries = 10, retryInterval = 5000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      // We must destroy the connection before re-initializing
      if (dataSource.isInitialized) {
        await dataSource.destroy();
      }
      await dataSource.initialize();
      console.log('✅ Database connection successful!');
      return;
    } catch (error) {
      console.error(`❌ Database connection attempt #${i + 1} failed.`);
      if (i < maxRetries - 1) {
        console.log(`Retrying in ${retryInterval / 1000} seconds...`);
        await sleep(retryInterval);
      }
    }
  }
  throw new Error('❌ Could not connect to the database after multiple retries.');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.get<string>('PGHOST'),
    port: configService.get<number>('PGPORT'),
    username: configService.get<string>('PGUSER'),
    password: configService.get<string>('PGPASSWORD'),
    database: configService.get<string>('PGDATABASE'),
    entities: [Job], // <-- THIS IS THE CORRECTED LINE
    synchronize: true,
  });

  try {
    await connectWithRetry(AppDataSource);
    // Destroy the temporary connection so the main app can connect
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  // --- Your original bootstrap code ---
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' 
      ? [process.env.CORS_ORIGIN, 'https://your-app.vercel.app'] 
      : ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true 
    })
  );

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Backend running on port ${port}`);
}

bootstrap();