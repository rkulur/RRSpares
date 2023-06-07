import { useContext, createContext, useState } from "react";
import { ChildrenType } from "../utils/interfaces";

interface DropDownContextType {
  selectedOption: string;
  updateSelectedOption: (option: string) => void;
}

const DropDownContext = createContext<DropDownContextType | undefined>(undefined);

export default function DropDownContextProvider({ children }: ChildrenType) {
  const [selectedOption, setSelectedOption] = useState("");
  const updateSelectedOption = (option: string) => {
    setSelectedOption(option);
  };
  return (
    <DropDownContext.Provider value={{ selectedOption, updateSelectedOption }}>{children}</DropDownContext.Provider>
  );
}

export function useDropDownSelect() {
  return useContext(DropDownContext);
}
