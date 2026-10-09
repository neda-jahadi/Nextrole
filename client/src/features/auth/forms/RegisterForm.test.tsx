import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import { expect, test } from 'vitest';
import RegisterForm from './RegisterForm';
import userEvent from '@testing-library/user-event';

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
});
