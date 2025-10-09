import React from 'react';

import Flex from '../flex/flex';

import { InputElement } from './contracts';
import { InputStyled, InputLabel, InputContainer, InputHint } from './styles';

const hidePlaceholderIf = [
  'color',
  'date',
  'datetime',
  'datetime-local',
  'month',
  'range',
  'time',
  'week',
];

const Input: React.FunctionComponent<InputElement> = ({
  disabled,
  error,
  hint,
  label,
  placeholder,
  type,
  value,
  id,
  onChange,
  width,
  ...rest
}) => {
  const [showPassword, togglePassword] = React.useState(false);

  const displayPlaceholder =
    !hidePlaceholderIf.includes(type as string) && placeholder && !value;

  return (
    <Flex flexDirection="column">
      {label && (
        <InputLabel variant="body2" disabled={disabled}>
          {label}
        </InputLabel>
      )}
      <InputContainer>
        <InputStyled
          aria-label={label || placeholder}
          error={error}
          disabled={disabled}
          onChange={onChange}
          placeholder={displayPlaceholder ? placeholder : ''}
          type={showPassword ? 'text' : type}
          value={value}
          id={id}
          {...rest}
        />
      </InputContainer>
      {hint && (
        <Flex alignItems="center">
          <InputHint error={error} disabled={disabled} variant="body2">
            {error && hint}
          </InputHint>
        </Flex>
      )}
    </Flex>
  );
};

Input.defaultProps = {
  disabled: false,
  error: false,
  type: 'text',
};

export default Input;
