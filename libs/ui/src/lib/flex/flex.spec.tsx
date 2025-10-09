import { render } from '../../helpers/test-utils';

import Flex from './flex';

describe('Flex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Flex />);
    expect(baseElement).toBeTruthy();
  });
});
