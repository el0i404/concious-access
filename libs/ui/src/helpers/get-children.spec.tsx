import { getChildrenByDisplayName, getChildrenByType } from './get-children';

function ChildItem1() {
  return <h1>Child item</h1>;
}
ChildItem1.displayName = 'Child item 1';

function ChildItem2() {
  return <h1>Child item</h1>;
}
ChildItem2.displayName = 'Child item 2';

describe('get-children', () => {
  it('should get one child by type ChildItem1', () => {
    const children = [null, <ChildItem1 />];

    const results = getChildrenByType(children, [ChildItem1]);
    expect(results.length).toBe(1);

    const [child] = results;
    expect(child?.type).toBe(ChildItem1);
  });

  it('should get two child by type [ChildItem1, ChildItem2]', () => {
    const children = [<ChildItem1 />, <ChildItem2 />];

    const results = getChildrenByType(children, [ChildItem1, ChildItem2]);

    expect(results.length).toBe(2);

    const [child1, child2] = results;
    expect(child1?.type).toBe(ChildItem1);
    expect(child2?.type).toBe(ChildItem2);
  });

  it('should get one child by display name [ChildItem1]', () => {
    const children = [<ChildItem1 />, <ChildItem2 />];

    const results = getChildrenByDisplayName(children, ['Child item 1']);

    expect(results.length).toBe(1);

    const [child] = results;
    expect(child).toHaveProperty('type.displayName', 'Child item 1');
  });

  it('should get two child by display name [ChildItem1, ChildItem2]', () => {
    const children = [<ChildItem1 />, null, <ChildItem2 />];

    const results = getChildrenByDisplayName(children, ['Child item 1', 'Child item 2']);

    expect(results.length).toBe(2);

    const [child1, child2] = results;
    expect(child1).toHaveProperty('type.displayName', 'Child item 1');
    expect(child2).toHaveProperty('type.displayName', 'Child item 2');
  });
});
