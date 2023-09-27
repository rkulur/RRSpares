import Select from "react-select";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { SelectOptionType } from "../../../../utils/interfaces";

type SelectBrandProps = {
  selectOptions: SelectOptionType[] | null | undefined;
  selectedOption: SelectOptionType | null;
  setSelectedOption: Dispatch<SetStateAction<SelectOptionType | null>>;
  setSelectedBrandId?: Dispatch<SetStateAction<string>>;
  defaultValue?: SelectOptionType;
  for: "form" | "list";
};

export default function SelectBrand({
  selectOptions,
  selectedOption,
  setSelectedOption,
  setSelectedBrandId,
  for: selectFor,
}: SelectBrandProps) {
  return (
    <>
      <Select
        value={selectedOption}
        styles={{
          menuList: (base) => ({
            ...base,
            "::-webkit-scrollbar": {
              width: "2px",
            },
            "::-webkit-scrollbar-track": {
              background: "#fedec4",
            },
            "::-webkit-scrollbar-thumb": {
              background: "#fb923c",
            },
            "::-webkit-scrollbar-thumb:hover": {
              background: "#e69500",
            },
          }),
        }}
        options={selectOptions!}
        formatOptionLabel={(option: SelectOptionType) => {
          return (
            <div className={`flex items-center  py-2 ${selectFor==='list' && 'justify-center'}`} title={option.value}>
              <img className="h-9 w-9 object-contain rounded-full" src={option.image} alt={option.value} />
              <p className="">{selectFor === "form" ? option.value : null}</p>
            </div>
          );
        }}
        onChange={(option) => {
          if (option) {
            setSelectedOption(option);
            setSelectedBrandId && setSelectedBrandId(option.label);
          }
        }}
      />
    </>
  );
}
