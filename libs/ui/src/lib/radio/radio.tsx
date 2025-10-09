// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Flex from '../flex/flex';
import {
  RadioContainer,
  RadioStyled,
  IconContainer,
  CheckStyled,
} from './styles/radio.styled';
import { IRadio } from './contracts';
import Box from '../box/box';

export function Radio({
  disabled,
  checked,
  label,
  onChange,
  onBlur,
  onFocus,
  index,
  indexIterable,
  ...rest
}: IRadio) {
  const handleOnClick = () => {
    if (disabled) {
      return;
    }

    onChange(index, indexIterable + 1);
  };

  return (
    <Flex
      alignItems="center"
      {...rest}
      style={{
        border: '1px solid white',
        borderRadius: '8px',
      }}
      key={index}
    >
      <Box
        style={{
          width: '21px',
          height: '21px',
          border: '1px solid white',
          borderRadius: '50%',
          margin: '5px 0 5px 5px',
        }}
      >
        <RadioContainer tabIndex={0} alignItems="center">
          <RadioStyled
            id={index}
            checked={checked}
            disabled={disabled}
            role="radio"
            aria-checked={checked}
            onClick={handleOnClick}
          >
            {checked && (
              <IconContainer alignItems="center">
                <CheckStyled fill="white" height="10px" width="100%" />
              </IconContainer>
            )}
          </RadioStyled>
        </RadioContainer>
      </Box>
      {label && (
        <blockquote
          contentEditable="true"
          onBlur={onBlur}
          onFocus={onFocus}
          style={{
            margin: 0,
            width: '90%',
            paddingLeft: '2px',
            outline: 'none',
          }}
        >
          {label}
        </blockquote>
      )}
    </Flex>
  );
}

Radio.defaultProps = {
  checked: false,
  disabled: false,
};

export default Radio;
