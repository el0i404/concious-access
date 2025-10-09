import React from 'react';
import Flex from '../flex/flex';

import { TextAreaElement } from './contracts';
import {
  TextAreaStyled,
  TextAreaContainer,
  TextAreaLabel,
  TextAreaHint,
} from './styles';

const TextArea: React.FunctionComponent<TextAreaElement> = ({
  disabled,
  error,
  hint,
  label,
  placeholder,
  value,
  id,
  cols,
  rows,
  onChange,
  ...rest
}) => {
  const displayPlaceholder = placeholder && !value;

  return (
    <Flex flexDirection="column" width="100%">
      {label && (
        <TextAreaLabel variant="body2" disabled={disabled}>
          {label}
        </TextAreaLabel>
      )}
      <TextAreaContainer>
        <TextAreaStyled
          error={error}
          disabled={disabled}
          onChange={onChange}
          placeholder={displayPlaceholder ? placeholder : ''}
          value={value}
          cols={cols}
          rows={rows}
          id={id}
          role={placeholder}
          {...rest}
        />
      </TextAreaContainer>
      {hint && (
        <Flex alignItems="center">
          <TextAreaHint error={error} disabled={disabled} variant="body2">
            hola
          </TextAreaHint>
        </Flex>
      )}
    </Flex>
  );
};

TextArea.defaultProps = {
  disabled: false,
  error: false,
};

export default TextArea;
