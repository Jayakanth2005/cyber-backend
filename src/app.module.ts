import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/entities/job.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Updated to use Railway's standard variables
      host: process.env.PGHOST || 'localhost',
      port: parseInt(process.env.PGPORT || '5432'),
      username: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'karthi',
      database: process.env.PGDATABASE || 'jk_database',
      entities: [Job],
      synchronize: true, // Set to false in production
    }),
    JobsModule,
  ],
})
export class AppModule {}