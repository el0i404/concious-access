import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useIsMobile from './use-is-mobile';

describe('useIsMobile', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useIsMobile());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
