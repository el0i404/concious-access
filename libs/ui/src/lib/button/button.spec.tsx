import { Plus } from '@factorypal-fe/shared/icons';

import { render, fireEvent } from '../../helpers/test-utils';

import Button from './button';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button onClick={() => null} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render loading successfully', () => {
    const { baseElement } = render(<Button loading onClick={() => null} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render submit type successfully', () => {
    const { baseElement } = render(<Button submit onClick={() => null} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render outlined type successfully', () => {
    const { baseElement } = render(<Button outlined onClick={() => null} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render secondary variant successfully', () => {
    const { baseElement } = render(<Button variant="secondary" onClick={() => null} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render tertiary variant successfully', () => {
    const { baseElement } = render(<Button variant="tertiary" onClick={() => null} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render button with icon successfully', () => {
    const { baseElement } = render(
      <Button onClick={() => null}>
        <Plus /> Add
      </Button>,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should trigger onClick successfully', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick} children="Button" />);
    fireEvent.click(getByText('Button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should not trigger onClick successfully', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button disabled onClick={onClick} children="Button" />);
    fireEvent.click(getByText('Button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
