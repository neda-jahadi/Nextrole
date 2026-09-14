import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const demoPassword = process.env.DEMO_PASSWORD;

if (!demoPassword || demoPassword.length < 8) {
  throw new Error(
    'DEMO_PASSWORD must be set and contain at least 8 characters before running the demo seed.',
  );
}

const companies = [
  ['Nordic Digital AB', 'company1@demo.se', 'jobs1@demo.se', '+46 31 555 010', '1480'],
  ['Cloud Harbor Sweden', 'company2@demo.se', 'jobs2@demo.se', '+46 8 555 020', '0180'],
  ['Greenline Systems', 'company3@demo.se', 'jobs3@demo.se', '+46 40 555 030', '1280'],
  ['West Coast Tech', 'company4@demo.se', 'jobs4@demo.se', '+46 31 555 040', '1481'],
  ['Northstar Software', 'company5@demo.se', 'jobs5@demo.se', '+46 18 555 050', '0380'],
  ['Brightworks AB', 'company6@demo.se', 'jobs6@demo.se', '+46 13 555 060', '0580'],
  ['Urban Data Labs', 'company7@demo.se', 'jobs7@demo.se', '+46 21 555 070', '1980'],
  ['Scandic Systems Group', 'company8@demo.se', 'jobs8@demo.se', '+46 90 555 080', '2480'],
].map(([name, email, contactEmail, contactPhone, municipalityCode]) => ({
  name,
  email,
  contactEmail,
  contactPhone,
  municipalityCode,
}));

const jobTemplates = [
  ['Frontend Developer', 'Full_Time', 'HYBRID', 'React, TypeScript, accessibility and component-driven development', '44 000–56 000 SEK/month'],
  ['Senior Frontend Developer', 'Full_Time', 'HYBRID', 'React, TypeScript, performance, design systems and frontend architecture', '50 000–62 000 SEK/month'],
  ['Fullstack Developer', 'Full_Time', 'HYBRID', 'React, Node.js, REST APIs, PostgreSQL and end-to-end product development', '46 000–58 000 SEK/month'],
  ['Backend Developer', 'Full_Time', 'REMOTE', 'Node.js, Express, SQL, API design, security and backend reliability', '48 000–60 000 SEK/month'],
  ['Software Engineer .NET', 'Full_Time', 'HYBRID', 'C#, ASP.NET Core, SQL, APIs and enterprise application development', '48 000–61 000 SEK/month'],
  ['Data Engineer', 'Full_Time', 'HYBRID', 'SQL, data pipelines, cloud platforms, data modelling and analytics engineering', '50 000–64 000 SEK/month'],
  ['Cloud Engineer', 'Full_Time', 'HYBRID', 'Azure or AWS, infrastructure automation, CI/CD and observability', '52 000–65 000 SEK/month'],
  ['DevOps Engineer', 'Contract', 'REMOTE', 'Docker, CI/CD pipelines, cloud infrastructure, monitoring and deployment automation', '750–900 SEK/hour'],
  ['QA Automation Engineer', 'Full_Time', 'REMOTE', 'Playwright, API testing, CI pipelines and automated quality assurance', '44 000–56 000 SEK/month'],
  ['UX Engineer', 'Full_Time', 'HYBRID', 'design systems, accessibility, CSS, prototyping and frontend engineering', '45 000–57 000 SEK/month'],
  ['React Developer', 'Full_Time', 'HYBRID', 'React, TypeScript, reusable components, testing and API integrations', '44 000–55 000 SEK/month'],
  ['Junior Fullstack Developer', 'Full_Time', 'ONSITE', 'React, TypeScript, APIs, relational databases and modern engineering practices', '36 000–44 000 SEK/month'],
  ['Frontend Developer Intern', 'Internship', 'ONSITE', 'React, TypeScript, accessibility, responsive design and teamwork', 'Internship'],
  ['Platform Engineer', 'Full_Time', 'HYBRID', 'cloud platforms, Kubernetes, CI/CD, security and developer tooling', '52 000–66 000 SEK/month'],
  ['Application Developer', 'Part_Time', 'HYBRID', 'web development, APIs, databases, testing and business applications', 'Part-time'],
];

function buildDescription(title, companyName, skills, variant) {
  return `${companyName} is looking for a ${title} to join one of our cross-functional product teams. This role is part of a long-term investment in modern digital products and internal platforms used by customers and colleagues across Sweden. You will work closely with developers, designers, product owners and business stakeholders, and you will have real influence over technical decisions and how the team delivers value.\n\nIn this position you will design, build and maintain production features with a strong focus on ${skills}. Depending on the assignment, your work may include implementing new functionality, improving existing services, integrating with external systems, reviewing code, investigating production issues and contributing to technical design. We value pragmatic solutions, clear APIs, maintainable code and thoughtful trade-offs rather than unnecessary complexity.\n\nWe expect you to be comfortable working in an agile environment where testing, code review and continuous delivery are part of everyday development. You should be willing to collaborate across disciplines, explain technical choices clearly and take responsibility for the quality of what you build. Experience from cloud environments, automated testing, accessibility, security or observability is considered valuable, even when it is not the main focus of the role.\n\nYou will join a supportive engineering culture where knowledge sharing and continuous improvement are encouraged. The team works iteratively, uses modern development tools and gives engineers room to learn and improve the platform over time. We are looking for someone who is curious, dependable and motivated by building useful software that works well for real users.\n\nThis is demo job ${variant}, created for NextRole portfolio data so search, filtering, pagination and larger-data behaviour can be tested realistically.`;
}

function buildJobs() {
  return jobTemplates.map(([title, type, workMode, skills, salary], index) => ({
    title: index % 4 === 0 ? `${title} ${index + 1}` : title,
    type,
    workMode,
    skills,
    salary,
  }));
}

async function upsertDemoUser(passwordHash) {
  return prisma.user.upsert({
    where: { email: 'user@demo.se' },
    update: {
      name: 'Demo User',
      password: passwordHash,
      role: 'USER',
    },
    create: {
      name: 'Demo User',
      email: 'user@demo.se',
      password: passwordHash,
      role: 'USER',
    },
  });
}

async function upsertDemoCompany(companyData, passwordHash, companyIndex) {
  const municipality = await prisma.municipality.findUnique({
    where: { code: companyData.municipalityCode },
  });

  if (!municipality) {
    throw new Error(
      `Municipality ${companyData.municipalityCode} was not found. Run npm run prisma:seed first.`,
    );
  }

  const user = await prisma.user.upsert({
    where: { email: companyData.email },
    update: {
      name: companyData.name,
      password: passwordHash,
      role: 'COMPANY',
    },
    create: {
      name: companyData.name,
      email: companyData.email,
      password: passwordHash,
      role: 'COMPANY',
    },
  });

  const company = await prisma.company.upsert({
    where: { userId: user.id },
    update: {
      name: companyData.name,
      description: `${companyData.name} is a Swedish technology company building digital products, business applications and data-driven services for customers across multiple industries.`,
      contactEmail: companyData.contactEmail,
      contactPhone: companyData.contactPhone,
      status: 'APPROVED',
      regionId: municipality.regionId,
      municipalityId: municipality.id,
    },
    create: {
      userId: user.id,
      name: companyData.name,
      description: `${companyData.name} is a Swedish technology company building digital products, business applications and data-driven services for customers across multiple industries.`,
      contactEmail: companyData.contactEmail,
      contactPhone: companyData.contactPhone,
      status: 'APPROVED',
      regionId: municipality.regionId,
      municipalityId: municipality.id,
    },
  });

  await prisma.job.deleteMany({ where: { companyId: company.id } });

  const jobs = buildJobs();

  await prisma.job.createMany({
    data: jobs.map((job, jobIndex) => ({
      title:
        jobIndex % 3 === 0
          ? `${job.title} ${companyIndex + 1}`
          : job.title,
      type: job.type,
      description: buildDescription(
        job.title,
        companyData.name,
        job.skills,
        `${companyIndex + 1}-${jobIndex + 1}`,
      ),
      salary: job.salary,
      workMode: job.workMode,
      companyId: company.id,
      regionId: municipality.regionId,
      municipalityId: municipality.id,
    })),
  });
}

async function main() {
  const passwordHash = await bcrypt.hash(demoPassword, 10);

  await upsertDemoUser(passwordHash);

  for (const [index, company] of companies.entries()) {
    await upsertDemoCompany(company, passwordHash, index);
  }

  const demoCompanyEmails = companies.map(({ email }) => email);
  const demoUsers = await prisma.user.findMany({
    where: { email: { in: ['user@demo.se', ...demoCompanyEmails] } },
    select: { id: true },
  });

  const demoUserIds = demoUsers.map(({ id }) => id);
  const demoCompanyCount = await prisma.company.count({
    where: { userId: { in: demoUserIds } },
  });
  const demoJobCount = await prisma.job.count({
    where: { company: { userId: { in: demoUserIds } } },
  });

  console.log(
    `Demo seed complete: ${demoUsers.length} users, ${demoCompanyCount} companies and ${demoJobCount} jobs are available.`,
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
