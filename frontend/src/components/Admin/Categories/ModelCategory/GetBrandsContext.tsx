import React, { createContext, useContext, useState } from "react";
import { ChildrenType, SelectOptionType } from "../../../../utils/interfaces";

type GetBrandContextType = {
  brandsList: SelectOptionType[];
  setBrandsList: React.Dispatch<React.SetStateAction<SelectOptionType[]>>;
};

const GetBrandContext = createContext<GetBrandContextType | undefined>(undefined);

export default function BrandProvider({ children }: ChildrenType) {
  const [brandsList, setBrandsList] = useState<SelectOptionType[]>([
    {
      value: "",
      label: "",
      image: "",
      id : ""
    },
  ]);

  return <GetBrandContext.Provider value={{ brandsList, setBrandsList }}>{children}</GetBrandContext.Provider>;
}

export function useGetBrands() {
  return useContext(GetBrandContext);
}
