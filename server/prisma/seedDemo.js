import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const demoPassword = process.env.DEMO_PASSWORD;

if (!demoPassword || demoPassword.length < 8) {
  throw new Error(
    'DEMO_PASSWORD must be set and contain at least 8 characters before running the demo seed.',
  );
}

const demoCompanies = [
  {
    user: {
      name: 'Nordic Digital AB',
      email: 'company.gothenburg@nextrole.demo',
    },
    company: {
      name: 'Nordic Digital AB',
      description:
        'A product-focused technology company building modern digital services for customers across the Nordic region.',
      contactEmail: 'jobs@nordicdigital.demo',
      contactPhone: '+46 31 555 010',
      municipalityCode: '1480',
    },
    jobs: [
      {
        title: 'Senior Frontend Developer',
        type: 'Full_Time',
        description:
          'Build accessible and responsive web experiences with React and TypeScript. You will work closely with designers, backend developers and product owners to improve a growing customer platform.',
        salary: '48 000–58 000 SEK/month',
        workMode: 'HYBRID',
      },
      {
        title: 'Fullstack Developer',
        type: 'Full_Time',
        description:
          'Develop end-to-end product features using React, Node.js, REST APIs and PostgreSQL. The team values clean architecture, automated testing and pragmatic delivery.',
        salary: '46 000–56 000 SEK/month',
        workMode: 'HYBRID',
      },
      {
        title: 'Frontend Developer Intern',
        type: 'Internship',
        description:
          'Join a product team and work with React, TypeScript, component libraries and accessibility. You will pair with experienced developers and contribute to real product features.',
        salary: 'Internship',
        workMode: 'ONSITE',
      },
      {
        title: 'UX Engineer',
        type: 'Full_Time',
        description:
          'Bridge design and engineering by turning prototypes into polished, accessible interfaces. Experience with design systems, CSS and modern frontend frameworks is valuable.',
        salary: '45 000–55 000 SEK/month',
        workMode: 'HYBRID',
      },
    ],
  },
  {
    user: {
      name: 'Cloud Harbor Sweden',
      email: 'company.stockholm@nextrole.demo',
    },
    company: {
      name: 'Cloud Harbor Sweden',
      description:
        'A cloud and data consultancy helping organizations modernize applications, platforms and analytics workloads.',
      contactEmail: 'careers@cloudharbor.demo',
      contactPhone: '+46 8 555 020',
      municipalityCode: '0180',
    },
    jobs: [
      {
        title: 'Backend Developer – Node.js',
        type: 'Full_Time',
        description:
          'Design and maintain APIs and backend services using Node.js, Express and PostgreSQL. You will improve reliability, security and performance together with a cross-functional team.',
        salary: '50 000–62 000 SEK/month',
        workMode: 'REMOTE',
      },
      {
        title: 'Data Engineer',
        type: 'Full_Time',
        description:
          'Build reliable data pipelines and models for analytics products. Experience with SQL, cloud platforms and data transformation workflows is preferred.',
        salary: '52 000–64 000 SEK/month',
        workMode: 'HYBRID',
      },
      {
        title: 'Cloud Engineer',
        type: 'Full_Time',
        description:
          'Help teams deploy and operate cloud-native services using infrastructure automation, CI/CD and observability. Azure or AWS experience is valuable.',
        salary: '52 000–65 000 SEK/month',
        workMode: 'HYBRID',
      },
      {
        title: 'QA Automation Engineer',
        type: 'Contract',
        description:
          'Create automated test coverage for web applications and APIs. You will work with developers to strengthen CI pipelines and improve release confidence.',
        salary: '700–850 SEK/hour',
        workMode: 'REMOTE',
      },
    ],
  },
  {
    user: {
      name: 'Greenline Systems',
      email: 'company.malmo@nextrole.demo',
    },
    company: {
      name: 'Greenline Systems',
      description:
        'A software company creating digital tools for logistics, sustainability and operational planning.',
      contactEmail: 'work@greenline.demo',
      contactPhone: '+46 40 555 030',
      municipalityCode: '1280',
    },
    jobs: [
      {
        title: 'React Developer',
        type: 'Full_Time',
        description:
          'Build and evolve a modern React application used by operational teams. You will work with TypeScript, reusable components, testing and API integrations.',
        salary: '45 000–55 000 SEK/month',
        workMode: 'HYBRID',
      },
      {
        title: 'Software Engineer – .NET',
        type: 'Full_Time',
        description:
          'Develop business-critical services with C#, ASP.NET Core and SQL. You will collaborate with frontend developers and contribute to architecture and code quality.',
        salary: '48 000–60 000 SEK/month',
        workMode: 'HYBRID',
      },
      {
        title: 'Junior Fullstack Developer',
        type: 'Full_Time',
        description:
          'Work across frontend and backend features with support from senior engineers. The stack includes React, TypeScript, APIs and relational databases.',
        salary: '37 000–44 000 SEK/month',
        workMode: 'ONSITE',
      },
      {
        title: 'DevOps Engineer',
        type: 'Contract',
        description:
          'Improve deployment pipelines, containerized environments and production monitoring. Experience with Docker, CI/CD and cloud infrastructure is expected.',
        salary: '750–900 SEK/hour',
        workMode: 'REMOTE',
      },
    ],
  },
];

async function upsertDemoUser(passwordHash) {
  return prisma.user.upsert({
    where: { email: 'demo.user@nextrole.demo' },
    update: {
      name: 'Demo Job Seeker',
      password: passwordHash,
      role: 'USER',
    },
    create: {
      name: 'Demo Job Seeker',
      email: 'demo.user@nextrole.demo',
      password: passwordHash,
      role: 'USER',
    },
  });
}

async function upsertDemoCompany(companyData, passwordHash) {
  const municipality = await prisma.municipality.findUnique({
    where: { code: companyData.company.municipalityCode },
  });

  if (!municipality) {
    throw new Error(
      `Municipality ${companyData.company.municipalityCode} was not found. Run npm run prisma:seed first.`,
    );
  }

  const user = await prisma.user.upsert({
    where: { email: companyData.user.email },
    update: {
      name: companyData.user.name,
      password: passwordHash,
      role: 'COMPANY',
    },
    create: {
      name: companyData.user.name,
      email: companyData.user.email,
      password: passwordHash,
      role: 'COMPANY',
    },
  });

  const company = await prisma.company.upsert({
    where: { userId: user.id },
    update: {
      name: companyData.company.name,
      description: companyData.company.description,
      contactEmail: companyData.company.contactEmail,
      contactPhone: companyData.company.contactPhone,
      status: 'APPROVED',
      regionId: municipality.regionId,
      municipalityId: municipality.id,
    },
    create: {
      userId: user.id,
      name: companyData.company.name,
      description: companyData.company.description,
      contactEmail: companyData.company.contactEmail,
      contactPhone: companyData.company.contactPhone,
      status: 'APPROVED',
      regionId: municipality.regionId,
      municipalityId: municipality.id,
    },
  });

  await prisma.job.deleteMany({
    where: { companyId: company.id },
  });

  await prisma.job.createMany({
    data: companyData.jobs.map((job) => ({
      ...job,
      companyId: company.id,
      regionId: municipality.regionId,
      municipalityId: municipality.id,
    })),
  });

  return company;
}

async function main() {
  const passwordHash = await bcrypt.hash(demoPassword, 10);

  await upsertDemoUser(passwordHash);

  for (const companyData of demoCompanies) {
    await upsertDemoCompany(companyData, passwordHash);
  }

  const demoCompanyEmails = demoCompanies.map(({ user }) => user.email);
  const demoUsers = await prisma.user.findMany({
    where: {
      email: {
        in: ['demo.user@nextrole.demo', ...demoCompanyEmails],
      },
    },
    select: { id: true },
  });

  const demoCompanyUsers = demoUsers.map(({ id }) => id);
  const demoCompanyCount = await prisma.company.count({
    where: { userId: { in: demoCompanyUsers } },
  });
  const demoJobCount = await prisma.job.count({
    where: {
      company: {
        userId: { in: demoCompanyUsers },
      },
    },
  });

  console.log(
    `Demo seed complete: ${demoCompanyCount} companies and ${demoJobCount} jobs are available.`,
  );
}

main()
  .catch((error) => {
    console.error('Demo seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
