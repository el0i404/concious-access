import React from 'react';

import {
  LoadingContainer,
  Bounce1,
  Bounce2,
  Bounce3,
} from './styles/loading-state.styled';
import { ILoading } from './contracts';

const ButtonLoading: React.FunctionComponent<ILoading> = (props: ILoading) => {
  const { variant } = props;

  return (
    <LoadingContainer variant={variant}>
      <Bounce1 />
      <Bounce2 />
      <Bounce3 />
    </LoadingContainer>
  );
};

export default ButtonLoading;
