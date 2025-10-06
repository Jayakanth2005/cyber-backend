import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/entities/job.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // Use the single DATABASE_URL provided by Railway
        url: configService.get<string>('DATABASE_URL'),
        entities: [Job],
        synchronize: true, // Set to false in production
        ssl: {
          rejectUnauthorized: false, // Required for Railway's secure connection
        },
      }),
    }),
    
    JobsModule,
  ],
})
export class AppModule {}