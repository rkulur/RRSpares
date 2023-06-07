import React from "react";
import PieChart from "./PieChart";

export default function Statistics() {
  return (
    <div className="h-[inherit] flex flex-col items-center justify-center gap-5">
      <div className="h-[85%] w-full flex flex-col items-center">
        <PieChart />
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col items-center">
          <div className="h-6 w-12 bg-orange-400"></div>
          <span>Processing</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-6 w-12 bg-blue-800"></div>
          <span>Delivered</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-6 w-12 bg-yellow-300"></div>
          <span>Cancelled</span>
        </div>
      </div>
    </div>
  );
}
