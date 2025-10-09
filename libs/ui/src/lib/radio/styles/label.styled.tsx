import styled from 'styled-components';

import { RadioElement } from '../contracts';

export const RadioLabel = styled.label<Pick<RadioElement, 'disabled'>>`
  display: flex;
  align-items: center;
  height: 20px;
  margin-bottom: 0;
  padding-left: 10px;
  color: white;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
`;
