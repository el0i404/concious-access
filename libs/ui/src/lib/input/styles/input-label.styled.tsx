import styled, { css } from 'styled-components';

import { InputDisabled } from '../contracts';
import Typography from '../../typography/typography';

const InputLabel = styled(Typography)<InputDisabled>`
  margin-bottom: ${({ theme: { space } }) => space[2]};
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

export { InputLabel };
