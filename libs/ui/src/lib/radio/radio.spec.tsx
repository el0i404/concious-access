import { render, act, fireEvent } from '../../helpers/test-utils';

import Radio from './radio';
import { IRadio } from './contracts';

describe('Radio', () => {
  const value = 'radio-1';
  const onChange = jest.fn();

  const Component = (props?: Partial<IRadio>) =>
    render(<Radio value={value} onChange={onChange} {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = Component();

    expect(baseElement).toBeTruthy();
  });

  it('should render checked successfully', () => {
    const { baseElement } = Component({ checked: true });

    expect(baseElement).toBeTruthy();
  });

  it('should render with label successfully', () => {
    const label = 'Label';
    const { baseElement, getByText } = Component({ label });

    expect(getByText(label)).toBeDefined();
    expect(baseElement).toBeTruthy();
  });

  it('should call onChange when clicking the label', () => {
    const label = 'Label';
    const { getByText } = Component({ label });

    act(() => {
      fireEvent.click(getByText(label));
    });

    expect(onChange).toHaveBeenCalledWith(value);
  });

  it('should not call onChange when disabled', () => {
    const label = 'Label';
    const { getByText } = Component({ label, disabled: true });

    act(() => {
      fireEvent.click(getByText(label));
    });

    expect(onChange).not.toHaveBeenCalled();
  });
});
