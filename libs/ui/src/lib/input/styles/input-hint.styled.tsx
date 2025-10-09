import styled, { css } from 'styled-components';

import Typography from '../../typography/typography';
import { InputError, InputDisabled } from '../contracts';

const InputHint = styled(Typography)<InputError & InputDisabled>`
  /* padding-top: ${({ theme: { space } }) => space[2]}; */
  font-size: 12px;

  ${({ error }) =>
    error &&
    css`
      color: ${({
        theme: {
          colors: { danger200 },
        },
      }) => danger200};
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({
        theme: {
          colors: { text50 },
        },
      }) => text50};
    `};
`;

export { InputHint };
