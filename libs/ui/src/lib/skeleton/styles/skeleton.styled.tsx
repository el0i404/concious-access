import styled, { keyframes } from 'styled-components';

import Box from '../../box/box';

const skeletonKeyframes = keyframes`
  0% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.8;
  }
`;

const Skeleton = styled(Box)`
  display: inline-block;
  height: ${({ theme: { space }, height }) => height || space[5]};
  width: ${({ width }) => width || '80%'};
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background: linear-gradient(270deg, rgba(217, 217, 217, 0.2) 0%, #d9d9d9 100%);
  background-size: ${({ backgroundSize }) => backgroundSize || '200px 100%'};
  background-repeat: no-repeat;
  border-radius: ${({ theme: { space }, borderRadius }) => (borderRadius as string) || space[2]};
`;

export default Skeleton;
