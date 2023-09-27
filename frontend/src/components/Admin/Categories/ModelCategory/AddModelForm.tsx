import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState, useEffect } from "react";
import { useAlert } from "../../../../Context/AlertContext";
import axios, { AxiosError, AxiosResponse } from "axios";
import { BrandResType, BrandType, ResType, SelectOptionType } from "../../../../utils/interfaces";
import Select from "react-select";
import SelectBrand from "./SelectBrand";
import { useGetBrands } from "./GetBrandsContext";

type AddBrandFormProps = {
  setModelAdded: Dispatch<SetStateAction<boolean>>;
  setTriggerLoader: Dispatch<SetStateAction<boolean>>;
};

export default function AddModelForm({ setModelAdded, setTriggerLoader }: AddBrandFormProps) {
  const [selectedImg, setSelectedImg] = useState<File | null>(null);

  
  const selectOptions = useGetBrands()?.brandsList
  const setSelectOptions = useGetBrands()?.setBrandsList
  
  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState("");

  const name = useRef<HTMLInputElement>(null);
  const modelImg = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const variants = useRef<HTMLInputElement>(null);

  const { alert, setAlert } = useAlert()!;

  function handleAcceptImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImg(file);
    }
  }

  function handleForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTriggerLoader(true);
    if (!selectedImg) {
      return;
    }
    const formData = new FormData();
    formData.append("modelImg", selectedImg);
    formData.append("brandId", selectedBrandId);
    formData.append("name", name.current?.value!);
    formData.append("description", description.current?.value!);
    formData.append("variants", variants.current?.value!);

    name.current && (name.current.value = "");
    description.current && (description.current.value = "");
    variants.current && (variants.current.value = "");
    modelImg.current && (modelImg.current.value = "");
    setSelectedImg(null);
    setSelectedOption(null);

    axios
      .post<ResType, AxiosResponse<ResType>>(`${import.meta.env.VITE_SERVER_URL}/categories/model`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.message);
        setSelectedImg(null);
        setModelAdded(true);
        setTriggerLoader(false);
        setAlert({
          state: true,
          type: "success",
          message: res.data.message,
        });
      })
      .catch((err: AxiosError<ResType>) => {
        console.log(err);
        setTriggerLoader(false);
        setAlert({
          state: true,
          type: "error",
          message: err.response?.data.message || "Something went wrong! Please try again",
        });
      });
  }

  // Get Brands
  useEffect(() => {
    axios
      .get<ResType & { brands: BrandType[] }, AxiosResponse<ResType & { brands: BrandType[] }>>(
        `${import.meta.env.VITE_SERVER_URL}/categories/brand`,
        { withCredentials: true }
      )
      .then((res) => {
        setSelectOptions && setSelectOptions(
          res.data.brands.map((brand) => ({
            value: brand.name,
            label: brand._id,
            image: brand.logo,
            id : brand._id
          }))
        );
        setTriggerLoader(false);
      });
  }, []);

  return (
    <div className="bg-white flex flex-col items-center py-10">
      <form className="w-3/4 flex flex-col gap-3" onSubmit={handleForm} encType="multipart/form-data">
        <h1 className="font-bold text-2xl text-center text-blue-800 ">ADD MODEL</h1>
        <div className="flex flex-col">
          <label htmlFor="name">Name : </label>
          <input ref={name} className="border px-3 py-2 outline-blue-800" id="name" type="text" required />
        </div>
        <label htmlFor="selectBrand">Brand : </label>
        <SelectBrand
          selectOptions={selectOptions}
          selectedOption={selectedOption}
          setSelectedBrandId={setSelectedBrandId}
          setSelectedOption={setSelectedOption}
          for="form"
        />
        <div className="flex flex-col">
          <label htmlFor="modelImg">Model Image : </label>
          <input
            ref={modelImg}
            className=" px-3 py-2 outline-blue-800"
            id="modelImg"
            type="file"
            accept="image/*"
            required
            onChange={handleAcceptImage}
          />
          {selectedImg && <img className="h-24 w-24 object-contain" src={URL.createObjectURL(selectedImg)} alt="" />}
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description : </label>
          <textarea ref={description} className="border px-3 py-2 outline-blue-800" id="description"></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="origin">Variants :</label>
          <input
            ref={variants}
            placeholder="Ex : LXI, VXI, VXI+"
            className="border px-3 py-2 outline-blue-800"
            id="origin"
            type="text"
            required
          />
        </div>
        <input
          className="border px-3 py-2 bg-orange-400 text-white rounded-md active:scale-[.98] outline-blue-800"
          type="submit"
          value={"Add Brand"}
        />
      </form>
    </div>
  );
}
