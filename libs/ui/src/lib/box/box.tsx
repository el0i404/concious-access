import css from '@styled-system/css';
import styled from 'styled-components';
import {
  background,
  border,
  color,
  compose,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
} from 'styled-system';

import { IBox } from './contracts';

const Box = styled.div<IBox>`
  box-sizing: border-box;

  ${({ row }) =>
    row &&
    css({
      marginX: [-5, -6, -8],
    })}

  ${compose(flexbox, layout, space, grid, color, border, position, background, shadow, typography)};
`;

Box.defaultProps = {};

export default Box;
