import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  ModelType,
  StateWithIdxType,
  ResType,
  ModelResType,
  BrandType,
  BrandResType,
  SelectOptionType,
} from "../../../../utils/interfaces";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useTriggerEditContext } from "../../../../Context/TriggerListEditedContext";
import { useAlert } from "../../../../Context/AlertContext";
import SelectBrand from "./SelectBrand";
import { useGetBrands } from "./GetBrandsContext";

interface ModelEditListProps {
  model: ModelType;
  setEnableEdit: React.Dispatch<React.SetStateAction<StateWithIdxType>>;
  setTriggerLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModelEditList({ model, setEnableEdit, setTriggerLoader }: ModelEditListProps) {
  const setBrandEdited = useTriggerEditContext()!.setBrandEdited;

  const modelImgRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const variantsRef = useRef<HTMLParagraphElement>(null);

  const [modelImgToUpdate, setModelImgToUpdate] = useState<File>();

  const selectOptions = useGetBrands()?.brandsList;
  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
  

  const setAlert = useAlert()!.setAlert;

  function disableEdit() {
    setEnableEdit({ idx: null, state: false });
  }

  async function handleEdit(modelId: string) {
    setTriggerLoader(true);
    const modelImg = modelImgRef.current?.files?.[0];
    const name = nameRef.current?.innerText.trim() || model.name;
    const description = descriptionRef.current?.innerText.trim() || model.description;
    const variants = variantsRef.current?.textContent?.split(', ')?.map((str)=>str.trim())?.join(' ') || model.variants.join(' ');
    const selectedBrandId = selectedOption?.id;

    const editFormData = new FormData();
    if (modelImg) {
      editFormData.append("modelImg", modelImg);
    }
    editFormData.append("name", name);
    editFormData.append("description", description);

    if(selectedBrandId){
      editFormData.append("brandId", selectedBrandId);
    }
    editFormData.append("variants", variants);
    
    axios
      .put<ResType, AxiosResponse<ResType>>(
        `${import.meta.env.VITE_SERVER_URL}/categories/model/${modelId}`,
        editFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.success) {
          setBrandEdited(true);
          disableEdit();
          setTriggerLoader(false);
          setAlert({
            state: true,
            type: "success",
            message: res.data.message,
          });
        }
      })
      .catch((err: AxiosError<ResType>) => {
        setTriggerLoader(false);
        if (err.response) {
          setAlert({
            state: true,
            type: "error",
            message: err.response.data.message,
          });
        }
      });
  }

  function handleFileInput(e:ChangeEvent<HTMLInputElement>){
    const modelImg = e.target.files?.[0]
    
    if(modelImg){
      setModelImgToUpdate(modelImg)
    }
  }

  useEffect(() => {
    selectOptions?.forEach((option) => {
      if (option.value === model.brand.name) {
        setSelectedOption(option);
      }
    });
  }, []);
  return (
    <>
      <div>
        <SelectBrand 
          selectOptions={selectOptions} 
          selectedOption={selectedOption} 
          setSelectedOption={setSelectedOption} 
          for={"list"} 
        /> 
      </div>
      <div
        className="h-16 flex items-center border outline-blue-800/20 rounded-sm shadow-inner bg-slate-300/20"
        
      >
        <div className="flex flex-col items-center gap-1 mx-1">
          <img src={modelImgToUpdate ? URL.createObjectURL(modelImgToUpdate) :  model.modelImg} alt="No image" className=" text-[.5rem] h-9 w-9 rounded-full object-cover" />
          <input type="file" className="hidden" ref={modelImgRef} onChange={handleFileInput}/>
          <button
            className="bg-blue-800 text-[0.4rem] text-white px-2 py-1 rounded-lg"
            onClick={() => {
              modelImgRef.current?.click();
            }}
          >
            Choose file
          </button>
        </div>
        <div contentEditable suppressContentEditableWarning className="text-sm overflow-y-auto outline-none" ref={nameRef}>
          {model.name}
        </div>
      </div>
      <p
        className="h-16 border outline-blue-800/20 overflow-auto custom-scrollbar rounded-sm shadow-inner bg-slate-300/20"
        contentEditable
        suppressContentEditableWarning
        ref={descriptionRef}
      >
        {model.description}
      </p>
      <div
        className="h-16 flex text-sm flex-wrap gap-1 outline-none"
        contentEditable
        suppressContentEditableWarning
        ref={variantsRef}
        title="The variants should be listed with a comma and a space between each, for example: one, two, three, and so on. "
      >
        {model.variants.join(', ')}
      </div>
      <div className="">
        <button
          className="rounded-full outline-green-600 active:scale-[.95]"
          onClick={() => {
            handleEdit(model._id);
          }}
        >
          <CheckCircleIcon className="h-8 w-8 text-green-500" />
        </button>
        <button className="rounded-full outline-red-700  active:scale-[.95]" onClick={disableEdit}>
          <XCircleIcon className="h-8 w-8 text-red-500" />
        </button>
      </div>
    </>
  );
}
