import styled, { css } from 'styled-components';

import Typography from '../../typography/typography';
import { TextAreaError, TextAreaDisabled } from '../contracts';

const TextAreaHint = styled(Typography)<TextAreaError & TextAreaDisabled>`
  padding-top: ${({ theme: { space } }) => space[2]};

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

export { TextAreaHint };
