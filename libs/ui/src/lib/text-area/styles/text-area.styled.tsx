import styled, { css } from 'styled-components';
import {
  CommonInputStyle,
  InputErrorStyle,
} from '../../input/styles/input.styled';

import { TextAreaElement } from '../contracts';

const TextAreaStyled = styled.textarea<TextAreaElement>`
  outline: none;
  border-radius: 8px;
  border: 1px solid white;
  padding: ${({ theme: { space } }) => `${space[3]} ${space[5]}`};
  color: white;
  background-color: var(--brand-black, #1c1c1c);

  ${({ cols }) =>
    !cols &&
    css`
      width: 100%;
    `}

  &:focus {
    border-color: white;
  }

  &:hover {
    border-color: white;
  }

  ${CommonInputStyle}
  ${InputErrorStyle}
`;

export { TextAreaStyled };
