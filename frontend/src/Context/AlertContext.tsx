import React, { createContext, useContext, useState } from "react";
import { Alert, ChildrenType } from "../utils/interfaces";

type AlertContextType = {
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export default function AlertProvider({ children }: ChildrenType) {
  const [alert, setAlert] = useState<Alert>({
    state: false,
    type: "error",
    message: "",
  });

  return <AlertContext.Provider value={{ alert, setAlert }}>{children}</AlertContext.Provider>;
}

export function useAlert() {
  return useContext(AlertContext);
}
