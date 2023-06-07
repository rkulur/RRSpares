import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { topProducts } from "../../../Content/AdminDashboard";
import React from "react";

export default function TopProducts() {
  return (
    <div className="h-[40rem] bg-white rounded-xl py-8 px-10 flex flex-col ">
      <div className="flex justify-between border-b-2 pb-4">
        <h3 className="font-bold text-blue-800 text-2xl">Top Products</h3>
        <EllipsisVerticalIcon className="h-6 w-6" />
      </div>
      <div className="h-full overflow-y-auto custom-scrollbar">
        {topProducts.map((topProduct, idx) => (
          <div key={idx} className="flex mt-10">
            <div>
              <img className="h-32 w-32 rounded-xl bg-orange-300" src={topProduct.imgSrc} />
            </div>
            <div className=" flex flex-col flex-grow justify-center px-3">
              <p className="font-semibold">{topProduct.title}</p>
              <p className="text-sm">{topProduct.description}</p>
              <div className="flex gap-2 items-center mt-2">
                <p className="text-lg font-semibold">{topProduct.price}</p>
                <p className="text-sm line-through">{topProduct.oldPrice}</p>
              </div>
            </div>
            <div className="text-sm flex flex-col justify-center items-center pr-4">{topProduct.noOfSales} sales</div>
          </div>
        ))}
      </div>
    </div>
  );
}
