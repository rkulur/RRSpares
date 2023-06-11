import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Alert as AlertType } from "../../utils/interfaces";

type AlertProps = {
  type: "success" | "error";
  message: string;
  state: boolean;
  resetTrigger:React.Dispatch<React.SetStateAction<AlertType>>
};

export default function Alert({ type, message,state,resetTrigger }: AlertProps) {
  const [trigger,setTrigger] = useState(state);
  useEffect(() => {
    const animationTimeout = setTimeout(()=>{
      setTrigger(false)
    },2800)
    const timeOut = setTimeout(() => {
      resetTrigger({state : false,type : 'success',message : ''});
    }, 3000);

    return () => {
      clearTimeout(timeOut);
      clearTimeout(animationTimeout);
    };
  }, [trigger]);

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  return (
    <div
      className={`bg-blue-800 text-white border defWidth translate-y-[-300%] transition-transform ease-cubic py-5 px-10 rounded-md top-20 absolute overflow-hidden ${
        trigger ? "animate-notification-on translate-y-[0]" : "animate-notification-off"
      } `}
    >
      <button
        onClick={() => {
          resetTrigger({state : false,type : 'success',message : ''})
          setTrigger(false)
        }}
        className=" absolute top-2 right-2 rounded-full active:scale-90 outline-orange-600"
      >
        <XMarkIcon className="h-6" />
      </button>
      <div>
        <span className={`font-semibold ${type.includes("success") ? "text-green-500" : "text-red-500"}`}>
          {capitalize(type)}
        </span>
        <span> : {message}</span>
      </div>
      <div className="h-1.5 w-full bg-orange-400 absolute bottom-0 left-0 z-10 animate-notification-off-slider"></div>
      <div className="h-1.5 w-full bg-orange-200 absolute bottom-0 left-0"></div>
    </div>
  );
}
