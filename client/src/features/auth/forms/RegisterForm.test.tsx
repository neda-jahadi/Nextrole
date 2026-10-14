import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import RegisterForm from './RegisterForm';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test, vi } from 'vitest';
import { register } from '../api/authApi';

vi.mock('../api/authApi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../api/authApi')>();

  return {
    ...actual,
    register: vi.fn(),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

test('renders the registration form', () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <RegisterForm onSuccessRedirect="/" />
      </MemoryRouter>
    </QueryClientProvider>,
  );

  expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
});

test('shows an error when passwords do not match', async () => {
  const user = userEvent.setup();
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <RegisterForm onSuccessRedirect="/" />
      </MemoryRouter>
    </QueryClientProvider>,
  );

  await user.type(screen.getByLabelText(/^Name/i), 'Neda');
  await user.type(screen.getByLabelText(/^Email/i), 'neda@example.com');
  await user.type(screen.getByLabelText(/^Password/i), 'A-long-password-123');
  await user.type(
    screen.getByLabelText(/^Confirm Password/i),
    'Another-password-456',
  );

  await user.click(screen.getByRole('button', { name: 'Register' }));

  expect(await screen.findByText("Passwords don't match")).toBeInTheDocument();
  expect(register).not.toHaveBeenCalled();
});

test('shows an error when name has less than two characters', async () => {
  const user = userEvent.setup();
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <RegisterForm onSuccessRedirect="/" />
      </MemoryRouter>
    </QueryClientProvider>,
  );

  await user.type(screen.getByLabelText(/^Name/i), 'N');
  await user.type(screen.getByLabelText(/^Email/i), 'neda@example.com');
  await user.type(screen.getByLabelText(/^Password/i), 'A-long-password-123');
  await user.type(
    screen.getByLabelText(/^Confirm Password/i),
    'A-long-password-123',
  );

  await user.click(screen.getByRole('button', { name: 'Register' }));

  expect(
    await screen.findByText('Name must be at least 2 characters'),
  ).toBeInTheDocument();
  expect(register).not.toHaveBeenCalled();
});

test('shows valid data calls register', async () => {
  const user = userEvent.setup();
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <RegisterForm onSuccessRedirect="/" />
      </MemoryRouter>
    </QueryClientProvider>,
  );

  await user.type(screen.getByLabelText(/^Name/i), 'Neda');
  await user.type(screen.getByLabelText(/^Email/i), 'neda@example.com');
  await user.type(screen.getByLabelText(/^Password/i), 'A-long-password-123');
  await user.type(
    screen.getByLabelText(/^Confirm Password/i),
    'A-long-password-123',
  );

  await user.click(screen.getByRole('button', { name: 'Register' }));

  await waitFor(() => {
    expect(register).toHaveBeenCalledWith(
      {
        name: 'Neda',
        email: 'neda@example.com',
        password: 'A-long-password-123',
      },
      expect.anything(),
    );
  });
});
