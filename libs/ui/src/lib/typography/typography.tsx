// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import StyledTypography from './styles/typography-content';
import { ITypography, variantMapping } from './contracts';

const Typography = (props: ITypography) => {
  const { variant = 'body1', as, typographyRef, testId } = props;

  const Component = as || variantMapping[variant] || 'span';

  return (
    <StyledTypography
      as={Component}
      ref={typographyRef}
      test-id={testId}
      {...props}
    />
  );
};

export default Typography;
