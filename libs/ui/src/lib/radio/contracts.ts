import { TestAttributes } from '../../contracts';
import { FlexProps } from '../flex/flex';

interface RadioElement {
  /** Radio's status */
  checked?: boolean;
  /** Set input as disabled */
  disabled?: boolean;
  /** onChange callback */
  onChange?: (value: string) => void;
  onBlur?: (value: React.FocusEvent<HTMLQuoteElement>) => void;
  onFocus?: (value: React.FocusEvent<HTMLQuoteElement>) => void;
}

interface IRadio extends RadioElement, TestAttributes, FlexProps {
  /** Radio's value */
  value: string;
  /** Input's label */
  label?: string;
}

export type { IRadio, RadioElement };
