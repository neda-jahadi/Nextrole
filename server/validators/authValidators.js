import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be max 50 characters'),

  email: z.string().trim().email('Invalid email address').toLowerCase(),

  password: z
    .string()
    .min(15, 'Password must be at least 15 characters')
    .refine(
      (value) => Buffer.byteLength(value, 'utf8') <= 72,
      'Password must not exceed 72 bytes',
    ),
});

export const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address').toLowerCase(),

  password: z.string().min(1, 'Password is required'),
});
