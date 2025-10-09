import React, { forwardRef } from 'react';

import { ModalProps } from './contracts';
import { ModalContainer } from './styles/modal-container.styled';

const Modal = forwardRef(({ children, ...rest }: ModalProps, ref) => {
  return (
    <ModalContainer ref={ref} flexDirection="column" role="dialog" {...rest}>
      {children}
    </ModalContainer>
  );
});

Modal.defaultProps = {
  width: '10.75rem',
  minHeight: '10.625rem',
  position: 'fixed',
  right: 0,
  top: '40px',
  zIndex: 99999999,
};

export default Modal;
