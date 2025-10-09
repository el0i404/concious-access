import { componentGenerator } from './component-generator';

function ChildItem1() {
  return <h1>Child item</h1>;
}

describe('componentGenerator()', () => {
  it('should create a component with the passed display name', () => {
    const results = componentGenerator('ChildItem1', ChildItem1);

    expect(results.type.displayName).toBe('ChildItem1');
  });
});
