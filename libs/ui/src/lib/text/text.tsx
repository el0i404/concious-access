// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import TextContainer from './styles/text-container.styled';
import { TextProps } from './contracts';

const Text = ({ children, ...props }: TextProps) => {
  return <TextContainer {...props}>{children}</TextContainer>;
};

Text.defaultProps = {
  color: 'white',
};

export default Text;
