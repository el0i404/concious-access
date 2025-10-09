// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { forwardRef } from 'react';
import { ModalContainer } from './styles';

const Modal = (
  { children, ...rest }: { children: React.ReactNode },
  ref: { ref: React.Ref<HTMLDivElement> }
) => {
  console.log('ref', ref);
  return (
    <ModalContainer ref={ref} {...rest}>
      {children}
    </ModalContainer>
  );
};

export default forwardRef(Modal);
