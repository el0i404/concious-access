import { DefaultTheme } from 'styled-components';
import { LayoutProps } from 'styled-system';

interface TestAttributes {
  /**
   * Element Id for test automation.
   * @desc generate "data-testid" attribute with given value,
   * its main purpose is to serve as a selector for query ops.
   */
  testId?: string;
}

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'quartary';

interface ILoading {
  /** Loading style. E.g. primary, secondary... */
  variant?: ButtonType;
}

interface IButton extends TestAttributes, LayoutProps, Record<string, unknown> {
  /** Title of button (displayed on hover) */
  title?: string;
  /** Button style. E.g. primary, secondary... */
  variant?: ButtonType;
  /** Define button as type submit */
  submit?: boolean;
  /** Sets button as loading */
  loading?: boolean;
  /** Sets button as disabled */
  disabled?: boolean;
  /** Set outline styles */
  outlined?: boolean;
  /** Button's size */
  size?: 'small' | 'large';
  /** Set to full width of container */
  expanded?: boolean;
  /** On button click  callback  */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** On button click or touch  */
  onPointerDown?: (event: React.PointerEvent<HTMLButtonElement>) => void;
  /** Button content */
  children?: React.ReactNode;
  theme?: DefaultTheme;
  width?: string | number;
}

export type { ButtonType };
export type { IButton, ILoading };
