import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function BrandLoader() {
  return (
    <div className="h-full w-full top-0 left-0 absolute">
      <div className="h-fit flex flex-col items-center justify-center right-[43%] top-[43%] absolute ">
        <FontAwesomeIcon className="h-16 text-blue-800 animate-spin" icon={faCircleNotch} />
        <h1 className=" font-bold text-orange-400">LOADING...</h1>
      </div>
    </div>
  );
}
