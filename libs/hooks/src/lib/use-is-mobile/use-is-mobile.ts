import { useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseIsMobile {
  isMobile: boolean;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);
  function hasTouchSupport() {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    if (regex.test(navigator.userAgent)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  useEffect(() => {
    hasTouchSupport();
  }, []);

  return isMobile;
}

export default useIsMobile;
