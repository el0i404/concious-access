import styled, { css } from 'styled-components';

import { IInputIcon } from '../contracts';

const InputTogglePass = styled.button<IInputIcon>`
  outline: none;
  position: absolute;
  top: 0;
  border-radius: 5px;
  right: ${({ theme: { space } }) => space[5]};
  z-index: 2;
  border: none;
  top: 5px;
  height: 30px;
  cursor: ${({ iconType }) =>
    iconType === 'password' ? 'pointer' : 'default!important'};
  color: white;
  background-color: transparent;
  transform: translateX(2px);
  &:disabled {
    cursor: default;
  }
  fill: ${({
    theme: {
      colors: { secondary100 },
    },
  }) => secondary100};

  &:focus {
    outline: none;
  }

  ${({ error }) =>
    error &&
    css`
      fill: ${({
        theme: {
          colors: { danger100 },
        },
      }) => danger100};
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      fill: ${({
        theme: {
          colors: { text50 },
        },
      }) => text50};
    `}
`;

export { InputTogglePass };
