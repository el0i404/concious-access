import styled from 'styled-components';

import Flex from '../../flex/flex';

const InputContainer = styled(Flex)<{ width?: string }>`
  /* width: ${({ width }) => width}; */
  position: relative;
  width: inherit !important;
`;

export { InputContainer };
