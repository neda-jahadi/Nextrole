import { z } from 'zod';

export const registerUserSchema = z
  .object({
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
        (value) => new TextEncoder().encode(value).length <= 72,
        'Password must not exceed 72 bytes',
      ),

    confirm_password: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

export type RegisterUserFormFields = z.infer<typeof registerUserSchema>;
