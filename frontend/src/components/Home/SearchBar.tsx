import React from "react";

export default function SearchBar() {
  return (
    <div className="">
      <input
        className="border-2 rounded-l-md pt-2.5 pb-2.5 pl-6 pr-6 w-80 outline-orange-500 border-r-0"
        type="text"
        placeholder="Search here"
      />
      <button className="rounded-r-md pt-3 pb-3 pl-6 pr-6 bg-orange-400 text-white">Search</button>
    </div>
  );
}
