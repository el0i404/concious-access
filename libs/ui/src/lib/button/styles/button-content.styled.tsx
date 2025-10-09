import styled from 'styled-components';

import Flex from '../../flex/flex';

const ButtonWrapper = styled(Flex)`
  gap: ${({ theme: { space } }) => `${space[2]}px`};
`;

export default ButtonWrapper;
