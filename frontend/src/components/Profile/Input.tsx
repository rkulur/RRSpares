import React, { ChangeEvent } from "react";

interface InputType {
  title: string;
  value: string;
  isDisabled: boolean;
  reference: React.MutableRefObject<HTMLInputElement | null>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ title = "", value = "", isDisabled = true, reference, handleChange }: InputType) {
  return (
    <div
      className={`w-[22rem]  flex flex-col justify-center py-2 px-4 h-[4rem] border-2 border-gray-300 ${
        isDisabled ? "  text-gray-500 bg-gray-100 cursor-not-allowed" : ""
      }  rounded-md`}
    >
      <span className="text-sm text-gray-500"> {!isDisabled ? title : ""} </span>
      <input
        type="text"
        className={`text-lg bg-inherit outline-none ${isDisabled ? "cursor-not-allowed select-none" : ""}`}
        value={value}
        ref={reference}
        name={title.charAt(0).toLowerCase() + title.substring(1).replace(/\s/g, "")}
        disabled={isDisabled}
        onChange={handleChange}
      />
    </div>
  );
}
