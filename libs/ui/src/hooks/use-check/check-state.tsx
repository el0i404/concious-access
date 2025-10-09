import { createContext, useState, useEffect } from 'react';

import { ICheckContextState, ICheckProvider } from './contracts';

const CheckContext = createContext<ICheckContextState>({
  selectedValues: [],
  isSelected: () => false,
  setSelected: () => null,
});

const CheckProvider = ({ initialValues, onChange, children }: ICheckProvider) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    setSelectedValues(initialValues || []);
  }, [initialValues]);

  const setSelected = ({ key, selected }: { key: string; selected: boolean }) => {
    let checkedValues = [...selectedValues];

    if (selected) {
      if (!selectedValues.includes(key)) {
        checkedValues = [...selectedValues, key];
      }
    } else {
      checkedValues = checkedValues.filter((values) => values !== key);
    }

    setSelectedValues(checkedValues);

    if (onChange) {
      onChange(checkedValues);
    }
  };

  const isSelected = (value: string): boolean => selectedValues.includes(value);

  return (
    <CheckContext.Provider value={{ selectedValues, setSelected, isSelected }}>
      {children}
    </CheckContext.Provider>
  );
};

export { CheckContext, CheckProvider };
