interface ICheckContextState {
  /** Selected filter value */
  selectedValues?: string[];
  /** Callback when value changes */
  setSelected?: (value: { key: string; selected: boolean }) => void;
  /** Check if is selected */
  isSelected: (value: string) => boolean;
}

interface ICheckProvider {
  children: React.ReactNode;
  initialValues?: string[];
  onChange?: (values: string[]) => void;
}

export type { ICheckContextState, ICheckProvider };
