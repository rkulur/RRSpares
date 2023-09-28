import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { ModelResType, ModelType } from "../../../../utils/interfaces";
import ModelList from "./ModelList";
import { useTriggerEditContext } from "../../../../Context/TriggerListEditedContext";
import AddModelForm from "./AddModelForm";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import ModelLoader from "../../BrandLoader";

export default function ModelCategory() {
  const [models, setModels] = useState<ModelType[] | undefined>(undefined);
  const [modelAdded, setModelAdded] = useState(false);
  const [modelDeleted, setModelDeleted] = useState(false);
  const [triggerLoader, setTriggerLoader] = useState(false);

  const modelEdited = useTriggerEditContext()!.brandEdited;
  const setModelEdited = useTriggerEditContext()!.setBrandEdited;

  useEffect(() => {
    setTriggerLoader(true);
    if (modelAdded) {
      setModelAdded(false);
    }
    if (modelDeleted) {
      setModelDeleted(false);
    }
    if (modelEdited) {
      setModelEdited(false);
    }
    axios.get<ModelResType,AxiosResponse<ModelResType>>(`${import.meta.env.VITE_SERVER_URL}/categories/model`, { withCredentials: true }).then((res) => {
      setModels(res.data.models);
      setTriggerLoader(false);
    });
  }, [modelAdded, modelEdited, modelDeleted]);

  return (
    <main className="flex flex-col items-center mt-10 relative">
      <section className="defWidthCategory grid grid-cols-[38%_60%] gap-6">
        <div>
          <AddModelForm setModelAdded={setModelAdded} setTriggerLoader={setTriggerLoader}/>
        </div>
        <div className="bg-white px-10 py-10 relative ">
          <h1 className="font-bold text-2xl uppercase text-blue-800">Models</h1>
          {triggerLoader ? (
            <ModelLoader />
          ) : models && models!.length > 0 ? (
            <ModelList
              head={["Brand", "Name", "Description", "Variants"]}
              models={models}
              setModelDeleted={setModelDeleted}
              setTriggerLoader={setTriggerLoader}
            />
          ) : (
            <div className="h-5/6 flex flex-col items-center justify-center">
              <PlusCircleIcon className="h-16 text-blue-800" />
              <h1 className="font-semibold text-orange-400 ">Add a new Model</h1>
            </div>
          )}
        </div>
      </section>
  </main>
  );
}
