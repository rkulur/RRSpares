import { faCircleNotch, faFan, faCompactDisc, faAsterisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center ">
      <div className="h-fit flex flex-col gap-4">
        <FontAwesomeIcon className="h-28 text-blue-800 animate-spin" icon={faCircleNotch} />
        <h1 className="text-3xl font-bold text-orange-400">LOADING...</h1>
      </div>
    </div>
  );
}
