import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  companyName: string;

  @Column()
  location: string;

  @Column()
  jobType: string;

  @Column({ nullable: true })
  salaryRange: string;

  @Column('text')
  description: string;

  @Column('text')
  requirements: string;

  @Column('text')
  responsibilities: string;

  @Column()
  applicationDeadline: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
