import { ReactNode, Fragment } from 'react';

export const componentGenerator = (
  displayName: string,
  children: ReactNode
) => {
  const Component = () => {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <Fragment>{children}</Fragment>;
  };

  Component.displayName = displayName;

  return <Component />;
};
