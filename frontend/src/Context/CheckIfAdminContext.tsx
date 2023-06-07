import React, { createContext, useContext, useState } from "react";
import { ChildrenType } from "../utils/interfaces";

interface CheckIfAdminContextType {
  isAdmin: boolean;
  updateIsAdmin: (bool: boolean) => void;
}

const CheckIfAdminContext = createContext<CheckIfAdminContextType | undefined>(undefined);

export default function CheckIfAdminProvider({ children }: ChildrenType) {
  const [isAdmin, setIsAdmin] = useState(false);

  function updateIsAdmin(bool: boolean) {
    setIsAdmin(bool);
  }

  return <CheckIfAdminContext.Provider value={{ isAdmin, updateIsAdmin }}>{children}</CheckIfAdminContext.Provider>;
}

export function useCheckAdmin() {
  return useContext(CheckIfAdminContext);
}
