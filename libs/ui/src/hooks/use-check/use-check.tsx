import { useContext } from 'react';

import { CheckContext } from './check-state';

const useCheck = () => {
  const context = useContext(CheckContext);
  if (!context) {
    console.warn(
      'Check compound components cannot be rendered outside the CheckProvider component',
    );
  }
  return context;
};

export default useCheck;
