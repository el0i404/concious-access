import { render } from '../../helpers/test-utils';

import Typography from './typography';

describe('Typography', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Typography />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a h2', () => {
    const { getByRole } = render(<Typography variant="heading2" />);

    const h2 = getByRole('heading', {
      level: 2,
    });

    expect(h2).toBeTruthy();
  });

  it('should render a h1', () => {
    const { getByRole } = render(<Typography variant="heading1" />);

    const h1 = getByRole('heading', {
      level: 1,
    });

    expect(h1).toBeTruthy();
  });

  it('should render body1 successfully', () => {
    const { baseElement } = render(<Typography variant="body1" />);
    expect(baseElement).toBeTruthy();
  });

  it('should render body2 successfully', () => {
    const { baseElement } = render(<Typography variant="body1" />);
    expect(baseElement).toBeTruthy();
  });
});
