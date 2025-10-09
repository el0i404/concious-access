import React from 'react';

export function getChildrenByType(children: React.ReactNode | React.ReactNode[], types: unknown[]) {
  return getArray(children).filter(
    (child: React.ReactNode) => React.isValidElement(child) && types.includes(child.type),
  ) as (React.ReactElement | React.ReactPortal)[];
}

export function getChildrenByDisplayName(children: React.ReactNode, displayNames: string[]) {
  return getArray(children).filter(
    (child: React.ReactNode) =>
      React.isValidElement(child) &&
      displayNames.includes((child.type as React.FC).displayName || 'Component'),
  );
}

function getArray(children: React.ReactNode | React.ReactNode[]): React.ReactNode[] {
  const array = React.Children.toArray(children);
  if (!React.Fragment) return array;

  return array.flatMap((child) => {
    if (React.isValidElement(child)) {
      const isFragment = child.type === 'Fragment';
      return isFragment ? getArray(child.props.children) : child;
    }

    return child;
  });
}
