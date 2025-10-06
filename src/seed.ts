import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JobsService } from './jobs/jobs.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const jobsService = app.get(JobsService);

  const seedJobs = [
    {
      title: 'Full Stack Developer',
      companyName: 'Amazon',
      location: 'Bangalore',
      jobType: 'Full-time',
      salaryRange: '12LPA',
      description: 'We are looking for a skilled Full Stack Developer to join our team.',
      requirements: 'Experience with React, Node.js, and databases',
      responsibilities: 'Develop and maintain web applications, collaborate with team members',
      applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Node.js Developer',
      companyName: 'Tesla',
      location: 'Mumbai',
      jobType: 'Full-time',
      salaryRange: '15LPA',
      description: 'Join our backend development team to build scalable applications.',
      requirements: 'Strong experience with Node.js, Express, and MongoDB',
      responsibilities: 'Design and implement backend services, optimize performance',
      applicationDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'UX/UI Designer',
      companyName: 'Zoho',
      location: 'Chennai',
      jobType: 'Full-time',
      salaryRange: '10LPA',
      description: 'Create amazing user experiences and intuitive designs.',
      requirements: 'Experience with Figma, Adobe Creative Suite, user research',
      responsibilities: 'Design user interfaces, conduct user research, create prototypes',
      applicationDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Frontend Developer',
      companyName: 'Google',
      location: 'Remote',
      jobType: 'Full-time',
      salaryRange: '25LPA',
      description: 'Build modern web applications with cutting-edge technologies.',
      requirements: 'Expert in React, TypeScript, and modern web technologies',
      responsibilities: 'Develop frontend applications, optimize performance, mentor juniors',
      applicationDeadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  try {
    for (const jobData of seedJobs) {
      await jobsService.create(jobData);
      console.log(`Created job: ${jobData.title} at ${jobData.companyName}`);
    }
    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await app.close();
  }
}

seed();