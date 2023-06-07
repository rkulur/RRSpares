import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import React from "react";
import { userList } from "../../../utils/interfaces";
import { useDropDownSelect } from "../../../Context/DropDownContext";

export interface ListProps {
  data: {
    heading: string[];
    body: userList[];
  };
  pageNo: number;
  filterValue: string;
}

export default function List({ data, pageNo, filterValue, gridCols }: ListProps & { gridCols: string }) {
  const noOfEntries = Number(useDropDownSelect()!.selectedOption);
  const updatedData = data.body
    .slice(noOfEntries * (pageNo - 1), noOfEntries * pageNo)
    .filter(
      (user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.email.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.status.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.joinOn.toLocaleDateString().toLowerCase().includes(filterValue.toLowerCase())
    );
  return (
    <>
      <div style={{ gridTemplateColumns: gridCols }} className={`grid py-3 border-b-2 font-semibold`}>
        {data.heading.map((h, idx) => (
          <div key={idx}>{h}</div>
        ))}
      </div>
      {updatedData.map((user, idx) => (
        <div key={idx} className={`grid py-3 border-b-2 items-center`} style={{ gridTemplateColumns: gridCols }}>
          <div>
            <img className="h-14 w-14 bg-yellow-200 rounded-lg" src={""} />
          </div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.phone}</div>
          <div>{user.totalBuy}</div>
          <div className={`${user.status === "active" ? "text-green-500" : "text-red-500"}`}>
            {user.status.toUpperCase()}
          </div>
          <div>{user.joinOn.toLocaleDateString()}</div>
          <div>
            <EllipsisVerticalIcon className="h-6 w-6" />
          </div>
        </div>
      ))}
    </>
  );
}
