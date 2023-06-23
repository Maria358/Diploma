import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/auth.context';
import { RoleContextProvider } from './contexts/role.context';
import App from './App';

test('renders CustomerLayout for customer role', () => {
  const mockUser = { /* mocked user object */ };
  const mockRole = 'customer';

  render(
    <AuthContextProvider value={{ user: mockUser }}>
      <RoleContextProvider value={{ role: mockRole }}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </RoleContextProvider>
    </AuthContextProvider>
  );

  // Assert that CustomerLayout is rendered for customer role
  expect(screen.getByTestId('customer-layout')).toBeInTheDocument();
});

test('renders AdminLayout for admin role', () => {
  const mockUser = { /* mock user object */ };
  const mockRole = 'admin';

  render(
    <AuthContextProvider value={{ user: mockUser }}>
      <RoleContextProvider value={{ role: mockRole }}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </RoleContextProvider>
    </AuthContextProvider>
  );

  // Assert that AdminLayout is rendered for admin role
  expect(screen.getByTestId('admin-layout')).toBeInTheDocument();
});
