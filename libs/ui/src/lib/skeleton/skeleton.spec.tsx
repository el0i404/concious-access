import { render } from '../../helpers/test-utils';

import Skeleton from './skeleton';

describe('Skeleton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Skeleton />);
    expect(baseElement).toBeTruthy();
  });
});
