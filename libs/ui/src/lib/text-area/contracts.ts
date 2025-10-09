import { TestAttributes } from '../../contracts';

type TextAreaError = Pick<TextAreaElement, 'error'>;

type TextAreaDisabled = Pick<TextAreaElement, 'disabled'>;

interface TextAreaElement
  extends TestAttributes,
    Partial<React.TextareaHTMLAttributes<HTMLTextAreaElement>> {
  /** TextArea's label */
  label?: string;
  /** TextArea's hint. */
  hint?: string;
  /** Toggle TextArea error state */
  error?: boolean;
  /** onChange callback */
  onChange?: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export type { TextAreaElement, TextAreaError, TextAreaDisabled };
