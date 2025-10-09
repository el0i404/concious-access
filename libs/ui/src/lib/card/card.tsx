import styled from 'styled-components';

import Box from '../box/box';
import { IBox } from '../box/contracts';

export type ICard = IBox;

const Card = styled(Box)<ICard>`
  box-shadow: 0px 2px 2px rgba(17, 29, 62, 0.15), 0px 3px 1px rgba(17, 29, 62, 0.1),
    0px 1px 5px rgba(17, 29, 62, 0.2);
  border-radius: 4px;
  background-color: ${({
    theme: {
      colors: { white100 },
    },
  }) => white100};
`;

Card.defaultProps = {};

export default Card;
