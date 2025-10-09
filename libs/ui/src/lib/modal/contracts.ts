import { SpaceProps } from 'styled-system';

import { ITypography } from '../typography/contracts';
import { FlexProps } from '../flex/flex';
import React from 'react';

interface ModalProps extends FlexProps {
  /** Modal children */
  ref: React.Ref<HTMLDivElement>;
  children?: React.ReactNode;
}

interface ModalBackdropProps {
  /** Backdrop click event */
  onClick?: () => void;
  /** Backdrop children  */
  children: React.ReactNode;
}

type CloseButton =
  | { close?: false; onClick?: never }
  | { close?: true; onClick?: () => void };

type ModalTitleProps = {
  /** Title children  */
  children?: React.ReactNode;
} & FlexProps &
  CloseButton;

interface ModalContentProps {
  /** Content children  */
  children: React.ReactNode;
}

interface ModalContentTextProps extends ITypography {
  /** Content Text children  */
  children: React.ReactNode;
}

interface ModalActionsProps extends SpaceProps, FlexProps {
  /** Actions children  */
  children: React.ReactNode;
}

export type {
  ModalProps,
  ModalBackdropProps,
  ModalTitleProps,
  ModalContentProps,
  ModalContentTextProps,
  ModalActionsProps,
};
