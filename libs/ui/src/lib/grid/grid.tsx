import styled from 'styled-components';

import Box from '../box/box';
import { IBox } from '../box/contracts';

export type GridProps = IBox;

const Grid = styled(Box)({
  display: 'grid',
});

export default Grid;
