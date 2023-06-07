import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { newCustomers } from "../../../Content/AdminDashboard";

export default function NewCustomers() {
  return (
    <div className="h-[40rem] bg-white rounded-xl py-8 px-10 flex flex-col">
      <div className=" flex justify-between border-b-2 pb-4">
        <h3 className="font-bold text-blue-800 text-2xl">New Customers</h3>
        <EllipsisVerticalIcon className="h-6 w-6" />
      </div>
      <div className="overflow-y-auto custom-scrollbar">
        {newCustomers.map((newCustomer, idx) => (
          <div key={idx} className="grid grid-cols-[60%_25%_15%] items-center mt-8">
            <div className="flex gap-3 items-center">
              <img className="h-12 w-12 bg-orange-300 rounded-lg" src={newCustomer.imgSrc} />
              <span>{newCustomer.name}</span>
            </div>
            <div>{newCustomer.noOfOrders} orders</div>
            <div>{newCustomer.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
