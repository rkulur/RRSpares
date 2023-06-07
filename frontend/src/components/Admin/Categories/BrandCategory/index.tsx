import { convertLength } from "@mui/material/styles/cssUtils";
import axios from "axios";
import React, { ChangeEvent, useState, useRef, FormEvent, useEffect } from "react";
import { BrandType } from "../../../../utils/interfaces";
import BrandList from "./BrandList";
import { storage } from "../../../../config/firebase";

export default function BrandCategory() {
  const [selectedImg, setSelectedImg] = useState<File | null>(null);

  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const countryOfOrigin = useRef<HTMLInputElement>(null);
  const logo = useRef<HTMLInputElement>(null);

  const [brands, setBrands] = useState<BrandType[] | undefined>(undefined);
  const [brandAdded, setBrandAdded] = useState(false);

  function handleAcceptImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImg(file);
    }
  }

  useEffect(() => {
    if (brandAdded) {
      setBrandAdded(false);
    }
    axios.get("http://localhost:5000/categories/brand", { withCredentials: true }).then((res) => {
      console.log(res.data);
      setBrands(res.data.brands);
    });
  }, [brandAdded]);

  function handleForm(e: FormEvent) {
    e.preventDefault();
    if (!selectedImg) {
      return;
    }
    const formData = new FormData();
    formData.append("logo", selectedImg);
    formData.append("name", name.current?.value!);
    formData.append("description", description.current?.value!);
    formData.append("countryOfOrigin", countryOfOrigin.current?.value!);

    axios
      .post("http://localhost:5000/categories/brand", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        name.current && (name.current.value = "");
        description.current && (description.current.value = "");
        countryOfOrigin.current && (countryOfOrigin.current.value = "");
        logo.current && (logo.current.value = "");
        setSelectedImg(null);
        setBrandAdded(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <main className="border flex flex-col items-center mt-10">
      <section className="defWidth border grid grid-cols-[40%_60%] gap-5">
        <div>
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
                {selectedImg && (
                  <img className="h-24 w-24 object-contain" src={URL.createObjectURL(selectedImg)} alt="" />
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="description">Description : </label>
                <textarea ref={description} className="border px-3 py-2 outline-blue-800" id="description"></textarea>
              </div>
              <div className="flex flex-col">
                <label htmlFor="origin">Country of Origin :</label>
                <input
                  ref={countryOfOrigin}
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
        </div>
        <div className="bg-white px-10 py-10">
          <h1 className="font-bold text-2xl uppercase text-blue-800">Brands</h1>
          {brands && <BrandList head={["Logo", "Name", "Description", "Country Of Origin"]} brands={brands} />}
        </div>
      </section>
    </main>
  );
}
