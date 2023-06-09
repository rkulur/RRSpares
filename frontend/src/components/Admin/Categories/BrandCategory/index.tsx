import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrandType } from "../../../../utils/interfaces";
import BrandList from "./BrandList";
import { useTriggerEditContext } from "../../../../Context/TriggerListEditedContext";
import AddBrandForm from "./AddBrandForm";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import BrandLoader from "./BrandLoader";

export default function BrandCategory() {
  const [brands, setBrands] = useState<BrandType[] | undefined>(undefined);
  const [brandAdded, setBrandAdded] = useState(false);
  const [brandDeleted, setBrandDeleted] = useState(false);
  const [triggerLoader, setTriggerLoader] = useState(false)

  const { triggerEdit, setTriggerEdit } = useTriggerEditContext()!;

  useEffect(() => {
    setTriggerLoader(true);
    if (brandAdded) {
      setBrandAdded(false);
    }
    if (brandDeleted) {
      setBrandDeleted(false);
    }
    if (triggerEdit) {
      setTriggerEdit(false);
    }
    axios.get(`${import.meta.env.VITE_SERVER_URL}/categories/brand`, { withCredentials: true }).then((res) => {
      setBrands(res.data.brands);
      setTriggerLoader(false)
    });
  }, [triggerEdit, brandAdded, brandDeleted]);

  return (
    <main className="flex flex-col items-center mt-10">
      <section className="defWidth border grid grid-cols-[40%_60%] gap-5">
        <div>
          <AddBrandForm setBrandAdded={setBrandAdded} setTriggerLoader={setTriggerLoader} />
        </div>
        <div className="bg-white px-10 py-10 relative">
          <h1 className="font-bold text-2xl uppercase text-blue-800">Brands</h1>
          {triggerLoader ? <BrandLoader/> : (
            brands && brands!.length > 0 ? (
              <BrandList
                head={["Logo", "Name", "Description", "Country Of Origin"]}
                brands={brands}
                setBrandDeleted={setBrandDeleted}
                setTriggerLoader = {setTriggerLoader}
              />
            ) : (
              <div className="h-5/6 flex flex-col items-center justify-center">
                <PlusCircleIcon className="h-16 text-blue-800" />
                <h1 className="font-semibold text-orange-400 ">Add a new Brand</h1>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}
