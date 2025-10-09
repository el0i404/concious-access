'use client';

import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ErrorCaption = ({ message }: { message: string }) => {
  return (
    <p className="fixed top-20 right-0 z-50 text-white bg-red-500 mx-4 p-4 rounded-md">
      <FontAwesomeIcon icon={faWarning} />
      <span className="ml-4">{message}</span>
    </p>
  );
};

export default ErrorCaption;
