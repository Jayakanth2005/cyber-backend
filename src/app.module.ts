import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/entities/job.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // This ensures that variables from the process environment (like Railway's) are loaded.
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    
    // This is the updated, asynchronous configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PGHOST', 'localhost'),
        port: configService.get<number>('PGPORT', 5432),
        username: configService.get<string>('PGUSER', 'postgres'),
        password: configService.get<string>('PGPASSWORD', 'karthi'),
        database: configService.get<string>('PGDATABASE', 'jk_database'),
        entities: [Job],
        synchronize: true, // Remember to set this to false in production
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      }),
    }),
    
    JobsModule,
  ],
})
export class AppModule {}