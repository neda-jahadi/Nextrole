import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import JobRoutes from './routes/job.route.js';
import AuthRoutes from './routes/auth.route.js';
import companyRoutes from './routes/companyRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import helmet from 'helmet';

import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'CLIENT_ORIGIN',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_CALLBACK_URL',
];

for (const name of requiredEnvVars) {
  if (!process.env[name]?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}

const app = express();
app.use(helmet());
const PORT = process.env.PORT || 5000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// CORS for Vite dev
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  }),
);

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
  });
});

app.use('/api/auth', AuthRoutes);
app.use('/api/jobs', JobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/locations', locationRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
