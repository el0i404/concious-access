import styled, { keyframes } from 'styled-components';

import { ILoading } from '../contracts';

const spinnerSize = '10px';

const bounce = keyframes`
    0%,
    80%,
    100% {
      transform: scale(0);
    }

    40% {
      transform: scale(1);
    }
`;

const Bounce1 = styled.div`
  animation-delay: -0.32s;
`;
const Bounce2 = styled.div`
  animation-delay: -0.16s;
`;
const Bounce3 = styled.div`
  animation-delay: -0.2s;
`;

const LoadingContainer = styled.div<ILoading>`
  cursor: progress;
  background-color: transparent;
  border: none;
  text-align: center;

  &:hover,
  &:focus {
    background-color: transparent;
  }

  > div {
    width: ${spinnerSize};
    height: ${spinnerSize};
    margin: ${({ theme: { space } }) => `${space[0]} ${space[2]}`};
    border-radius: 100%;
    display: inline-block;
    animation: ${bounce} 1.4s infinite ease-in-out both;
    background-color: ${({ variant }) =>
      variant === 'primary' ? 'black' : 'blue'};
  }
`;

export { Bounce1, Bounce2, Bounce3, LoadingContainer };
