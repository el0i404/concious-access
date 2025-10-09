import { render } from '@testing-library/react';

import ShortText from './short-text';

describe('ShortText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShortText />);
    expect(baseElement).toBeTruthy();
  });
});
