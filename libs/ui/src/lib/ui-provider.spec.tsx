import { render } from '@testing-library/react';

import UIProvider from './ui-provider';

describe('UIProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UIProvider />);
    expect(baseElement).toBeTruthy();
  });
});
