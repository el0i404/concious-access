import styled, { css } from 'styled-components';
import Check from './Check';

import Flex from '../../flex/flex';
import { RadioElement } from '../contracts';

const status = ({ disabled, checked }: RadioElement) => {
  if (disabled) {
    return css`
      border: 1.7px solid white;
      color: white;
      background-color: white;
    `;
  }

  if (checked) {
    return css`
      border: white;
      background-color: white;
      cursor: pointer;
    `;
  }

  return css`
    /* background-color: white; */
    cursor: pointer;

    :hover {
      border-color: ${({ theme: { colors } }) => colors.primary100};
    }
  `;
};

export const IconContainer = styled(Flex)`
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export const CheckStyled = styled(Check)`
  position: absolute;
  width: auto;
  height: 11px;
  border-radius: 50%;
  padding: 5px;
  border-color: white;
`;

export const RadioContainer = styled(Flex)`
  padding: 2px 2px 0 2px;
`;

export const RadioStyled = styled.span<RadioElement>`
  border-radius: 50%;
  width: 15px;
  height: 15px;

  ${status}
`;
