import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateJobDto {
  @IsString() @IsNotEmpty() title: string;
  @IsString() @IsNotEmpty() companyName: string;
  @IsString() @IsNotEmpty() location: string;
  @IsString() @IsNotEmpty() jobType: string;
  @IsString() @IsOptional() salaryRange?: string;
  @IsString() @IsNotEmpty() description: string;
  @IsString() @IsNotEmpty() requirements: string;
  @IsString() @IsNotEmpty() responsibilities: string;
  @IsDateString() @IsNotEmpty() applicationDeadline: string;
}
