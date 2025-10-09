import styled from 'styled-components';

import Flex from '../../flex/flex';

const ModalContainer = styled.div`
  background-color: ${({
    theme: {
      colors: { text0 },
    },
  }) => text0};
  max-height: 100%;
  overflow-x: auto;
`;

export { ModalContainer };
