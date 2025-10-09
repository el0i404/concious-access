import { render } from '@testing-library/react';

import MultipleChoice from './multiple-choice';

describe('MultipleChoice', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MultipleChoice />);
    expect(baseElement).toBeTruthy();
  });
});
