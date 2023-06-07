import { ArrowSmallDownIcon, ArrowSmallUpIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

export default function DocumentScroll() {
  const [isScrollUp, setIsScrollUp] = useState(false);
  useEffect(() => {
    function handleScroll() {
      const scrollableElement = document.documentElement;
      const scrollPosition = scrollableElement.scrollTop;
      setIsScrollUp(scrollPosition <= scrollableElement.scrollHeight / 8);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="fixed bottom-24 right-14">
      <button
        onClick={() => {
          window.scrollTo({
            top: Number(`${isScrollUp ? document.documentElement.scrollHeight! : 0}`),
            behavior: "smooth",
          });
        }}
        className="border bg-orange-400 text-white p-3 rounded-lg active:scale-[.98]"
      >
        {!isScrollUp ? <ArrowSmallUpIcon className="h-6 w-6" /> : <ArrowSmallDownIcon className="h-6 w-6" />}
      </button>
    </div>
  );
}
