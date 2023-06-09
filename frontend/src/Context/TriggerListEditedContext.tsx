import { useContext, useState, createContext, Dispatch, SetStateAction } from "react";
import { ChildrenType } from "../utils/interfaces";

type TriggerListEditedContextType = {
  triggerEdit: boolean;
  setTriggerEdit: Dispatch<SetStateAction<boolean>>;
};

const TriggerListEditedContext = createContext<TriggerListEditedContextType | undefined>(undefined);

export default function TriggerListEditedProvider({ children }: ChildrenType) {
  const [triggerEdit, setTriggerEdit] = useState(false);

  return (
    <TriggerListEditedContext.Provider value={{ triggerEdit, setTriggerEdit }}>
      {children}
    </TriggerListEditedContext.Provider>
  );
}

export function useTriggerEditContext() {
  return useContext(TriggerListEditedContext);
}
