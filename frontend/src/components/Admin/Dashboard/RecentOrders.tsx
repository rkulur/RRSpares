import React, { useRef } from "react";
import DropdownSelect from "../Utils/DropdownSelect";
import { recentOrders } from "../../../Content/AdminDashboard";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function RecentOrders() {
  const selectValue = useRef<HTMLSelectElement>(null);
  const options = [
    {
      value: "Today",
      label: "Today",
    },
    {
      value: "Yesterday",
      label: "Yesterday",
    },
    {
      value: "Last 7 Days",
      label: "Last 7 Days",
    },
    {
      value: "Last 30 Days",
      label: "Last 30 Days",
    },
    {
      value: "This Month",
      label: "This Month",
    },
    {
      value: "Last Month",
      label: "Last Month",
    },
  ];
  return (
    <section className="h-[30rem] bg-white mt-10 py-8 px-10 rounded-xl shadow-md ">
      <div className="flex justify-between border-b-2 pb-4">
        <h3 className="font-bold text-blue-800 text-2xl">Recent Orders</h3>
        <DropdownSelect selectValue={selectValue} options={options} />
      </div>
      <div className="h-[85%] overflow-x-auto custom-scrollbar ">
        <div className="grid grid-cols-[12%_28%_8%_14%_14%_12%_12%] grid-rows-[3] text-lg text-center text-slate-500 pt-4">
          <div>Order Id</div>
          <div>Product Name</div>
          <div>Units</div>
          <div>Order Date</div>
          <div>Order Cost</div>
          <div>Status</div>
          <div></div>
        </div>
        {recentOrders.map((recentOrder, idx) => (
          <div key={idx} className="grid grid-cols-[12%_28%_8%_14%_14%_12%_12%] grid-rows-[3] text-center mt-8">
            <div className="">{recentOrder.orderId}</div>
            <div className="">{recentOrder.productName}</div>
            <div className="">{recentOrder.units.length < 2 && `0${recentOrder.units}`}</div>
            <div className="">{recentOrder.orderDate.toLocaleDateString()}</div>
            <div className="">{recentOrder.orderCost}</div>
            <div
              className={` text-sm flex flex-col  justify-center rounded-xl ${
                recentOrder.status === "Processing"
                  ? "bg-orange-400 text-white"
                  : recentOrder.status === "Delivered"
                  ? "bg-blue-800 text-white"
                  : "bg-yellow-400 text-black"
              } `}
            >
              {recentOrder.status}
            </div>
            <div className="flex flex-col items-center">
              <EllipsisVerticalIcon className="h-6 w-6" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
