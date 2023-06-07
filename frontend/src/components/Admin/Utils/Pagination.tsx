import React, { useEffect, useState, RefObject } from "react";
import { useDropDownSelect } from "../../../Context/DropDownContext";
import { usePaginationHook } from "../../../Context/PaginationContext";

interface PaginationProps {
  noOfEntries: RefObject<HTMLSelectElement>;
  data: any[];
}

export default function Pagination({ noOfEntries, data }: PaginationProps) {
  const { selectedOption, updateSelectedOption } = useDropDownSelect()!;
  const { pageNo, setPageNo } = usePaginationHook()!;
  const [paginationLength, setPaginationLength] = useState(0);
  // const [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    if (selectedOption.length < 1) {
      updateSelectedOption(noOfEntries.current!.value);
    }

    setPaginationLength(Math.ceil(data.length / Number(selectedOption)));
    setPageNo(1);
  }, [selectedOption, paginationLength]);
  return (
    <div className="flex justify-end text-white mt-6 select-none cursor-pointer">
      <div
        onClick={() => {
          if (pageNo <= 1) {
            setPageNo(paginationLength);
            return;
          }
          setPageNo((prev) => prev - 1);
        }}
        className=" py-3 flex justify-center items-center w-24 bg-orange-400 rounded-l-lg active:scale-[.98]  "
      >
        Previous
      </div>
      <div
        style={{
          gridTemplateColumns: `repeat(${paginationLength},minmax(0,1fr))`,
        }}
        className={`grid grid-rows-1 text-black  `}
      >
        {data.slice(0, paginationLength).map((u, idx) => (
          <div
            key={idx + u.phone}
            onClick={(e) => {
              setPageNo(idx + 1);
              const childrens = e.currentTarget.parentElement?.children;
              childrens &&
                Array.from(childrens).forEach((child) => {
                  child.classList.remove("bg-blue-800", "text-white");
                });
              e.currentTarget.classList.add("bg-blue-800", "text-white");
            }}
            className={`px-5 border hover:brightness-75 justify-center items-center flex ${
              pageNo === idx + 1 ? "bg-blue-800 text-white" : ""
            }`}
          >
            {idx + 1}
          </div>
        ))}
      </div>
      <div
        onClick={() => {
          if (pageNo >= paginationLength) {
            setPageNo(1);
            return;
          }
          setPageNo((prev) => prev + 1);
        }}
        className=" py-2 flex items-center justify-center w-24 bg-orange-400 rounded-r-lg active:scale-[.98] "
      >
        Next
      </div>
    </div>
  );
}
