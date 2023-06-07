import { createContext, useContext, useState } from "react";
import { ChildrenType } from "../utils/interfaces";

interface PaginationContextProps {
  pageNo: number;
  setPageNo: (number: React.SetStateAction<number>) => void;
}

const PaginationContext = createContext<PaginationContextProps | undefined>(undefined);

export default function PaginationProvider({ children }: ChildrenType) {
  const [pageNo, setPageNo] = useState(1);
  return <PaginationContext.Provider value={{ pageNo, setPageNo }}>{children}</PaginationContext.Provider>;
}

export function usePaginationHook() {
  return useContext(PaginationContext);
}
