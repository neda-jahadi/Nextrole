import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 15 characters long'),
});

export type LoginFormFields = z.infer<typeof loginSchema>;
