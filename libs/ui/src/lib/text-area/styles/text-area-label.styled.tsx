import styled, { css } from 'styled-components';

import { TextAreaDisabled } from '../contracts';
import Typography from '../../typography/typography';

const TextAreaLabel = styled(Typography)<TextAreaDisabled>`
  margin-bottom: ${({ theme: { space } }) => space[3]};

  color: white;
  /* ${({ disabled }) =>
    disabled &&
    css`
      color: ${({
        theme: {
          colors: { text50 },
        },
      }) => text50};
    `} */
`;

export { TextAreaLabel };
