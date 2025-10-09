import { TestAttributes, InputTypes } from '../../contracts';

type InputError = Pick<InputElement, 'error'>;

type InputDisabled = Pick<InputElement, 'disabled'>;

type InputType = 'text' | 'password' | 'search';

interface InputElement
  extends TestAttributes,
    Partial<React.InputHTMLAttributes<HTMLInputElement>> {
  /** Input's type */
  type?: InputTypes;
  /** Input's value */
  value?: string | string[];
  /** Input's placeholder */
  placeholder?: string;
  /** Input's label */
  label?: string;
  /** Input's hint. */
  hint?: string;
  /** Toggle input error state */
  error?: boolean;
  /** Set input as disabled */
  disabled?: boolean;
  /** onChange callback */
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IInputIcon extends Pick<InputElement, 'disabled' | 'error'> {
  /** Input's type */
  iconType?: InputTypes;
  /** Input's show password */
  showPassword?: boolean;
  /** On password toogle event */
  onTogglePassword?: () => void;
}

export type { InputElement, IInputIcon, InputError, InputDisabled, InputType };
