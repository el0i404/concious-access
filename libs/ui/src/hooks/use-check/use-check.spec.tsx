import { renderHook, act } from '@testing-library/react';
import React from 'react';

import { CheckProvider } from './check-state';
import useCheck from './use-check';

describe('useCheck()', () => {
  test('should change value to new selected', () => {
    const oldValue = 'item-2';
    const newValue = 'item-1';

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CheckProvider initialValues={[oldValue]} onChange={jest.fn()}>
        {children}
      </CheckProvider>
    );

    const { result } = renderHook(() => useCheck(), { wrapper });

    act(() => {
      result.current.setSelected({ key: newValue, selected: true });
    });

    expect(result.current.selectedValues).toStrictEqual([oldValue, newValue]);
  });

  test('should remove selected value when unchecked', () => {
    const oldValue = 'item-2';

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CheckProvider initialValues={[oldValue]} onChange={jest.fn()}>
        {children}
      </CheckProvider>
    );

    const { result } = renderHook(() => useCheck(), { wrapper });

    act(() => {
      result.current.setSelected({ key: oldValue, selected: false });
    });

    expect(result.current.selectedValues).toStrictEqual([]);
  });

  test('should keep selected value when no change', () => {
    const oldValue = 'item-2';

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CheckProvider initialValues={[oldValue]} onChange={jest.fn()}>
        {children}
      </CheckProvider>
    );

    const { result } = renderHook(() => useCheck(), { wrapper });

    act(() => {
      result.current.setSelected({ key: oldValue, selected: true });
    });

    expect(result.current.selectedValues).toStrictEqual([oldValue]);
  });

  it('should call onChange with correct values', () => {
    const onChange = jest.fn();
    const oldValue = 'item-2';
    const newValue = 'item-1';

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CheckProvider initialValues={[oldValue]} onChange={onChange}>
        {children}
      </CheckProvider>
    );

    const { result } = renderHook(() => useCheck(), { wrapper });

    act(() => {
      result.current.setSelected({ key: newValue, selected: true });
    });

    expect(onChange).toHaveBeenCalledWith([oldValue, newValue]);
  });
});
