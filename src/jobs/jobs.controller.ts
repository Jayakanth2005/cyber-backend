import { Controller, Get, Post, Put, Delete, Param, Query, Body, ParseIntPipe } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobQueryDto } from './dto/job-query.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

 @Get()
findAll(@Query() query: JobQueryDto) {
  const { title, location, jobType, minSalary, maxSalary, page = 1, limit = 10 } = query;
  return this.jobsService.findAll(
    { title, location, jobType, minSalary, maxSalary },
    page,
    limit,
  );
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}
