import ButtonLoading from './button-loading';
import { ButtonWrapper, ButtonContent } from './styles';
import { IButton } from './contracts';

const Button: React.FunctionComponent<IButton> = ({
  children,
  onClick,
  loading,
  ...props
}) => {
  const { variant, submit, disabled } = props;

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      return;
    }

    onClick(event);
  };

  return (
    <ButtonWrapper
      {...props}
      disabled={disabled}
      type={submit ? 'submit' : 'button'}
      onClick={handleOnClick}
    >
      <ButtonContent
        color={disabled ? 'gray' : 'inherit'}
        justifyContent="center"
        alignItems="center"
      >
        {loading && <ButtonLoading variant={variant} />}
        {!loading && children}
      </ButtonContent>
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  variant: 'primary',
  submit: false,
  loading: false,
  disabled: false,
  outlined: false,
  size: 'large',
  expanded: false,
};

export default Button;
