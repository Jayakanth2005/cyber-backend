import { IsOptional, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class JobQueryDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsString() jobType?: string;
  @IsOptional() @IsString() minSalary?: string;
  @IsOptional() @IsString() maxSalary?: string;

  @IsOptional() @Type(() => Number) @IsInt() page?: number;
  @IsOptional() @Type(() => Number) @IsInt() limit?: number;
}
