import axios from "axios";
import React, { Dispatch, SetStateAction, ChangeEvent, FormEvent, useRef, useState } from "react";

type AddBrandFormProps = {
  setBrandAdded: Dispatch<SetStateAction<boolean>>;
  setTriggerLoader: Dispatch<SetStateAction<boolean>>;
};

export default function AddBrandForm({ setBrandAdded, setTriggerLoader }: AddBrandFormProps) {
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const countryOfOrigin = useRef<HTMLInputElement>(null);
  const logo = useRef<HTMLInputElement>(null);

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
    formData.append("logo", selectedImg);
    formData.append("name", name.current?.value!);
    formData.append("description", description.current?.value!);
    formData.append("countryOfOrigin", countryOfOrigin.current?.value!);

    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/categories/brand`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(() => {
        name.current && (name.current.value = "");
        description.current && (description.current.value = "");
        countryOfOrigin.current && (countryOfOrigin.current.value = "");
        logo.current && (logo.current.value = "");
        setSelectedImg(null);
        setBrandAdded(true);
        setTriggerLoader(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="bg-white flex flex-col items-center py-10">
      <form className="w-3/4 flex flex-col gap-3" onSubmit={handleForm} encType="multipart/form-data">
        <h1 className="font-bold text-2xl text-center text-blue-800 ">ADD BRAND</h1>
        <div className="flex flex-col">
          <label htmlFor="name">Name : </label>
          <input ref={name} className="border px-3 py-2 outline-blue-800" id="name" type="text" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="logo">Logo : </label>
          <input
            ref={logo}
            className=" px-3 py-2 outline-blue-800"
            id="logo"
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
          <label htmlFor="origin">Country of Origin :</label>
          <input ref={countryOfOrigin} className="border px-3 py-2 outline-blue-800" id="origin" type="text" required />
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
