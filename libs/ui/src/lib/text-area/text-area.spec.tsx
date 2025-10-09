import { render, fireEvent } from '../../helpers/test-utils';

import TextArea from './text-area';
import { TextAreaElement } from './contracts';

describe('TextArea', () => {
  const setup = (args?: Partial<TextAreaElement>) => {
    const utils = render(<TextArea {...args} />);

    return {
      ...utils,
    };
  };

  it('should render successfully', () => {
    const { baseElement } = setup();

    expect(baseElement).toBeTruthy();
  });

  it('should render a label', () => {
    const args = { label: 'textarea label' };
    const { queryByText } = setup(args);

    expect(queryByText(args.label)).toBeDefined();
  });

  it('should render a hint', () => {
    const args = { hint: 'textarea hint' };
    const { queryByText } = setup(args);

    expect(queryByText(args.hint)).toBeDefined();
  });

  it('should render a hint error', () => {
    const args = { hint: 'textarea hint error', error: true };
    const { queryByText } = setup(args);

    expect(queryByText(args.hint)).toBeDefined();
  });

  it('should render a placeholder text-area error', () => {
    const args = { placeholder: 'textarea placeholder' };
    const { queryByText } = setup(args);

    expect(queryByText(args.placeholder)).toBeDefined();
  });

  it('should render disabled successfully', () => {
    const args = { hint: 'textarea hint', disabled: true, error: true };
    const { baseElement } = setup(args);

    expect(baseElement).toBeTruthy();
  });

  it('should call onChange when the value changes', () => {
    const args = { value: 'value', placeholder: 'textarea', onChange: jest.fn() };
    const { getByRole } = setup(args);

    fireEvent.change(getByRole('textarea'), { target: { value: 'new text-area value' } });

    expect(args.onChange).toHaveBeenCalled();
  });
});
