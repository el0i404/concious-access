import React, { createContext, useState, useContext } from 'react';

type TGuidelinesContextProps = {
  guideLines: Array<{ guide_lines: [] }>;
  setGuideLines: React.Dispatch<React.SetStateAction<never[]>>;
};

export const GuidelinesContext = createContext<TGuidelinesContextProps | null>(
  null
);

const CreateGuidelinesContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [guideLines, setGuideLines] = useState([]);

  return (
    <GuidelinesContext.Provider
      value={{
        guideLines,
        setGuideLines,
      }}
    >
      {children}
    </GuidelinesContext.Provider>
  );
};

export default CreateGuidelinesContext;

export const useGuidelinesContext = () => {
  const context = useContext(GuidelinesContext);
  if (!context) {
    throw new Error(
      'useGuidelinesContext must be used within a GuidelinesProvider'
    );
  }

  return context;
};
