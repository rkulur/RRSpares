import { useContext, createContext, useState } from "react";
import { ChildrenType } from "../utils/interfaces";
import { BrandSelect } from "../utils/interfaces";


interface SelectBrandContextType {
  selectedOption: BrandSelect;
  updateSelectedOption: (option: BrandSelect) => void;
}

const SelectBrandContext = createContext<SelectBrandContextType | undefined>(undefined);

export default function SelectBrandContextProvider({ children }: ChildrenType) {
  const [selectedOption, setSelectedOption] = useState({} as BrandSelect);
  const updateSelectedOption = (option: BrandSelect) => {
    setSelectedOption(option);
  };
  return (
    <SelectBrandContext.Provider value={{ selectedOption, updateSelectedOption }}>{children}</SelectBrandContext.Provider>
  );
}

export function useSelectBrandContext() {
  return useContext(SelectBrandContext);
}
