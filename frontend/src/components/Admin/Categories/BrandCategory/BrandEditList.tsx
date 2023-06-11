import React, { ChangeEvent, useRef, useState } from "react";
import { BrandType, StateWithIdxType, ResType } from "../../../../utils/interfaces";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useTriggerEditContext } from "../../../../Context/TriggerListEditedContext";
import { useAlert } from "../../../../Context/AlertContext";
import { stepLabelClasses } from "@mui/material";

interface BrandEditListProps {
  brand: BrandType;
  setEnableEdit: React.Dispatch<React.SetStateAction<StateWithIdxType>>;
  setTriggerLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BrandEditList({ brand, setEnableEdit, setTriggerLoader }: BrandEditListProps) {
  const setBrandEdited = useTriggerEditContext()!.setBrandEdited;

  const [logoImgToEdit, setLogoImgToEdit] = useState<File | undefined>(undefined);
  const logoRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const countryOfOriginRef = useRef<HTMLParagraphElement>(null);

  const setAlert = useAlert()!.setAlert;

  function disableEdit() {
    setEnableEdit({ idx: null, state: false });
  }

  function handleChangeLogoImg(e: ChangeEvent<HTMLInputElement>) {
    const logoFile = e.target.files?.[0];

    if (logoFile) {
      setLogoImgToEdit(logoFile);
    }
  }

  async function handleEdit(brandId: string) {
    setTriggerLoader(true);
    const logo = logoRef.current?.files?.[0];
    const name = nameRef.current?.innerText.trim() || brand.name;
    const description = descriptionRef.current?.innerText.trim() || brand.description;
    const countryOfOrigin = countryOfOriginRef.current?.innerText.trim() || brand.countryOfOrigin;

    const editFormData = new FormData();
    if (logo) {
      editFormData.append("logo", logo);
    }
    editFormData.append("name", name);
    editFormData.append("description", description);
    editFormData.append("countryOfOrigin", countryOfOrigin);

    axios
      .put<ResType, AxiosResponse<ResType>>(
        `${import.meta.env.VITE_SERVER_URL}/categories/brand/${brandId}`,
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
        if (err.response?.data) {
          setAlert({
            state: true,
            type: "error",
            message: err.response?.data.message,
          });
        }
      });
  }

  function handleCancel() {
    disableEdit();
  }

  return (
    <>
      <div className="h-16 flex flex-col items-center gap-1">
        <div className="h-10 w-10 flex flex-col items-center justify-center rounded-full shadow-inner bg-slate-300/20 relative">
          {logoImgToEdit ? (
            <img className="object-contain h-full w-full" src={URL.createObjectURL(logoImgToEdit)} alt="" />
          ) : (
            <img className="object-contain h-full w-full" src={brand.logo} alt="" />
          )}
        </div>
        <input
          className="text-[.5rem] border outline-blue-800/20 rounded-full hidden"
          type="file"
          accept="image/*"
          ref={logoRef}
          onChange={handleChangeLogoImg}
        />
        <button
          onClick={() => {
            logoRef.current?.click();
          }}
          className="text-[.5rem] bg-blue-800 text-white px-2 py-1 rounded-lg active:scale-[.98]"
        >
          Choose File
        </button>
      </div>
      <p
        className="h-16 flex items-center justify-center border outline-blue-800/20 rounded-sm shadow-inner bg-slate-300/20"
        contentEditable
        suppressContentEditableWarning
        ref={nameRef}
      >
        {brand.name}
      </p>
      <p
        className="h-16 border outline-blue-800/20 overflow-auto custom-scrollbar rounded-sm shadow-inner bg-slate-300/20"
        contentEditable
        suppressContentEditableWarning
        ref={descriptionRef}
      >
        {brand.description}
      </p>
      <p
        className="h-16 flex items-center justify-center border outline-blue-800/20 rounded-sm shadow-inner bg-slate-300/20"
        contentEditable
        suppressContentEditableWarning
        ref={countryOfOriginRef}
      >
        {brand.countryOfOrigin}
      </p>
      <div className="">
        <button
          className="rounded-full outline-green-600 active:scale-[.95]"
          onClick={() => {
            handleEdit(brand._id);
          }}
        >
          <CheckCircleIcon className="h-8 w-8 text-green-500" />
        </button>
        <button className="rounded-full outline-red-700  active:scale-[.95]" onClick={handleCancel}>
          <XCircleIcon className="h-8 w-8 text-red-500" />
        </button>
      </div>
    </>
  );
}
