import React, { SetStateAction, Dispatch, useEffect, useRef, useState } from "react";
import { BrandType, ResType } from "../../../../utils/interfaces";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import BrandEditList from "./BrandEditList";
import { StateWithIdxType } from "../../../../utils/interfaces";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useAlert } from "../../../../Context/AlertContext";

interface BrandListProps {
  brands: BrandType[];
  head: string[];
  setBrandDeleted: Dispatch<SetStateAction<boolean>>;
  setTriggerLoader: Dispatch<SetStateAction<boolean>>;
}

export default function BrandList({ brands, head, setBrandDeleted, setTriggerLoader }: BrandListProps) {
  const [triggerMenu, setTriggerMenu] = useState<StateWithIdxType>({
    idx: null,
    state: false,
  });

  const [enableEdit, setEnableEdit] = useState<StateWithIdxType>({
    idx: null,
    state: false,
  });

  const setAlert = useAlert()!.setAlert;

  function handleTriggerEdit(idx: number) {
    setEnableEdit({
      idx,
      state: true,
    });
  }

  async function handleDeleteBrand(brandId: string) {
    setTriggerLoader(true);
    try {
      const res = await axios.delete<ResType, AxiosResponse<ResType>>(
        `${import.meta.env.VITE_SERVER_URL}/categories/brand/${brandId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setBrandDeleted(true);
        setTriggerLoader(false);
        setAlert({
          state: true,
          type: "success",
          message: res.data.message,
        });
      }
    } catch (error: AxiosError<ResType> | unknown) {
      setTriggerLoader(false);
      const err = error as AxiosError<ResType>;
      if (err.response) {
        setAlert({
          state: true,
          type: "error",
          message: err.response.data.message,
        });
        return;
      }
      setAlert({
        state: true,
        type: "error",
        message: err.message,
      });
    }
  }

  const listFunctionality = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleListFunctionality(e: Event) {
      if (listFunctionality.current && !listFunctionality.current.contains(e.target as Node)) {
        setTriggerMenu((prev) => {
          return {
            ...prev,
            state: false,
          };
        });
      }
    }
    document.addEventListener("mousedown", handleListFunctionality);
    return () => {
      document.removeEventListener("mousedown", handleListFunctionality);
    };
  }, [enableEdit]);

  return (
    <div className={` mt-5`}>
      <div className={`grid border-b-2 pb-2`} style={{ gridTemplateColumns: `15% 20% 35% 25% 5%` }}>
        {head.map((h, idx) => {
          const lastHeading = idx === head.length - 1;
          return (
            <div key={idx} className={`font-semibold ${lastHeading && "text-center"}`}>
              {h}
            </div>
          );
        })}
      </div>
      {brands.map((brand, idx) => {
        const lastList = idx === brands.length - 1;
        return (
          <div
            id={brand._id}
            key={idx}
            className={`grid gap-2 mt-2 items-center ${lastList ? "" : "border-b-2"} pb-2`}
            style={{
              gridTemplateColumns: `10% 20% 35% 25% 5%`,
            }}
          >
            {enableEdit.state && enableEdit.idx === idx ? (
              // Edit
              <BrandEditList brand={brand} setEnableEdit={setEnableEdit} setTriggerLoader={setTriggerLoader} />
            ) : (
              // List
              <>
                <img className="h-16 w-16 object-contain rounded-full" src={brand.logo}></img>
                <p className="px-3">{brand.name}</p>
                <p className="">{brand.description}</p>
                <p className="text-center">{brand.countryOfOrigin}</p>
                <div
                  onClick={(e) => {
                    setTriggerMenu((prev) => {
                      return {
                        idx: idx,
                        state: !prev.state,
                      };
                    });
                  }}
                  className="relative"
                >
                  <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer " />
                  {triggerMenu.state && triggerMenu.idx === idx && (
                    <div
                      ref={listFunctionality}
                      className="absolute z-10 rounded-md shadow-lg right-5 top-full grid grid-rows-2 w-32 h-16 border bg-white "
                    >
                      <div
                        className="flex px-2 py-2 hover:bg-slate-200 active:bg-slate-300 items-center cursor-pointer border-b-2"
                        onClick={() => {
                          handleTriggerEdit(idx);
                        }}
                      >
                        <PencilIcon className="h-6 w-6 text-green-500" />
                        <span className=" ml-2">Edit</span>
                      </div>
                      <div
                        className="flex px-2 py- hover:bg-slate-200 active:bg-slate-300 items-center cursor-pointer"
                        onClick={() => {
                          handleDeleteBrand(brand._id);
                        }}
                      >
                        <TrashIcon className="h-6 w-6 text-red-500" />
                        <span className=" ml-2">Delete</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
