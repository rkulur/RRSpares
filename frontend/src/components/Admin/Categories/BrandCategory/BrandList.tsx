import React, { useEffect, useRef, useState } from "react";
import { BrandType } from "../../../../utils/interfaces";
import { CheckCircleIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface BrandListProps {
  brands: BrandType[];
  head: string[];
}

type TriggerMenuType = {
  idx: number | null;
  state: boolean;
};

export default function BrandList({ brands, head }: BrandListProps) {
  const [triggerMenu, setTriggerMenu] = useState<TriggerMenuType>({
    idx: null,
    state: false,
  });

  const [enableEdit, setEnableEdit] = useState<TriggerMenuType>({
    idx: null,
    state: false,
  });

  function handleEditBrand(idx: number) {
    setEnableEdit({idx,state: true});
  }

  function handleDeleteBrand(e: React.MouseEvent<HTMLDivElement>) {
    console.log("delete");
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
  }, []);

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
              <>
                <div className="flex flex-col items-center justify-center">
                  <input
                    className="h-16 w-16 text-[.5rem] border border-blue-800 outline-blue-800 rounded-full"
                    type="file"
                    accept="image/*"
                  ></input>
                </div>
                <p
                  className="h-16 flex items-center justify-center border border-blue-800 outline-blue-800 rounded-sm"
                  contentEditable
                  suppressContentEditableWarning
                >
                  {brand.name}
                </p>
                <p
                  className="h-16 border border-blue-800 outline-blue-800 overflow-auto custom-scrollbar rounded-sm"
                  contentEditable
                  suppressContentEditableWarning
                >
                  {brand.description}
                </p>
                <p
                  className="h-16 flex items-center justify-center border border-blue-800 outline-blue-800 rounded-sm"
                  contentEditable
                  suppressContentEditableWarning
                >
                  {brand.countryOfOrigin}
                </p>
                <div className="">
                  <CheckCircleIcon className="h-8 w-8 text-green-500 active:scale-[.95]" />
                  <XCircleIcon
                  onClick={() => {
                    setEnableEdit({idx : null,state : false})
                  }} 
                  className="h-8 w-8 text-red-500 active:scale-[.95]" />
                </div>
              </>
            ) : (
              <>
                <img className="h-16 w-16 object-contain rounded-full" src={brand.logo}></img>
                <p>{brand.name}</p>
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
                  <EllipsisVerticalIcon className="h-6 w-6" />
                  {triggerMenu.state && triggerMenu.idx === idx && (
                    <div
                      ref={listFunctionality}
                      className="absolute z-10 rounded-md shadow-lg right-5 top-full grid grid-rows-2 w-32 h-16 border bg-white "
                    >
                      <div
                        className="flex px-2 py-2 hover:bg-slate-200 active:bg-slate-300 items-center cursor-pointer border-b-2"
                        onClick={() => {
                          handleEditBrand(idx);
                        }}
                      >
                        <PencilIcon className="h-6 w-6 text-green-500" />
                        <span className=" ml-2">Edit</span>
                      </div>
                      <div
                        className="flex px-2 py- hover:bg-slate-200 active:bg-slate-300 items-center cursor-pointer"
                        onClick={handleDeleteBrand}
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
