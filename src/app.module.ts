import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/entities/job.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),

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
        synchronize: true, // Set to false in production
        // The SSL line has been removed from here
      }),
    }),

    JobsModule,
  ],
})
export class AppModule {}