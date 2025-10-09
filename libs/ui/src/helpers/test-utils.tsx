/* eslint-disable import/export */
import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';
import { IntlProvider } from '@factorypal-fe/shared/intl';
import { AuthProvider } from '@factorypal-fe/shared/auth';

import { UIProvider } from '..';

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <IntlProvider translationMessages={{}}>
      <UIProvider>
        <AuthProvider
          state={{
            isAuthenticated: false,
            user: '',
          }}
        >
          <MemoryRouter>{children}</MemoryRouter>
        </AuthProvider>
      </UIProvider>
    </IntlProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
