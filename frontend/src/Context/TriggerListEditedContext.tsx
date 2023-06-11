import { useContext, useState, createContext, Dispatch, SetStateAction } from "react";
import { ChildrenType } from "../utils/interfaces";

type TriggerListEditedContextType = {
  brandEdited: boolean;
  setBrandEdited: Dispatch<SetStateAction<boolean>>;
};

const TriggerListEditedContext = createContext<TriggerListEditedContextType | undefined>(undefined);

export default function TriggerListEditedProvider({ children }: ChildrenType) {
  const [brandEdited, setBrandEdited] = useState(false);

  return (
    <TriggerListEditedContext.Provider value={{ brandEdited, setBrandEdited }}>
      {children}
    </TriggerListEditedContext.Provider>
  );
}

export function useTriggerEditContext() {
  return useContext(TriggerListEditedContext);
}
