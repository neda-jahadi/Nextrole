import { expect, test } from 'vitest';
import { registerUserSchema } from './registerUser';

test('rejects a password shorter than 15 characters', () => {
  const result = registerUserSchema.safeParse({
    name: 'Neda',
    email: 'neda@example.com',
    password: 'short123',
    confirm_password: 'short123',
  });

  expect(result.success).toBe(false);
});

test('accepts valid registration details', () => {
  const result = registerUserSchema.safeParse({
    name: 'Neda',
    email: 'neda@example.com',
    password: 'a-long-password-123',
    confirm_password: 'a-long-password-123',
  });

  expect(result.success).toBe(true);
});

test('rejects mismatched passwords', () => {
  const result = registerUserSchema.safeParse({
    name: 'Neda',
    email: 'neda@example.com',
    password: 'a-long-password-123',
    confirm_password: 'different-password-123',
  });

  expect(result.success).toBe(false);

  if (!result.success) {
    console.log('here is:', result.error.issues);
    expect(result.error.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['confirm_password'],
        }),
      ]),
    );
  }
});

test('reject an invalid email', () => {
  const input = {
    name: 'Neda',
    email: 'not-an-email',
    password: 'a-long-password-123',
    confirm_password: 'a-long-password-123',
  };

  const result = registerUserSchema.safeParse(input);

  expect(result.success).toBe(false);
});

test('accepts a password of 72 bytes but rejects a password of 73 bytes', () => {
  const validatePassword = (password: string) =>
    registerUserSchema.safeParse({
      name: 'Neda',
      email: 'neda@example.com',
      password: password,
      confirm_password: password,
    });

  const acceptPassword = validatePassword('é'.repeat(36));
  const rejectPassword = validatePassword('é'.repeat(37));

  expect(acceptPassword.success).toBe(true);
  expect(rejectPassword.success).toBe(false);
});
