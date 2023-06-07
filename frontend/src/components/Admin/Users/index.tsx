import { useState, useRef } from "react";
import { DropDownOption } from "../../../utils/interfaces";
import { users } from "../../../Content/AdminUsers";
import { faTh, faThList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePaginationHook } from "../../../Context/PaginationContext";
import List from "./List";
import DropdownSelect from "../Utils/DropdownSelect";
import Pagination from "../Utils/Pagination";
import DocumentScroll from "../Utils/DocumentScroll";
import Grid from "./Grid";

export default function Users() {
  const selectValue = useRef<HTMLSelectElement>(null);
  const mainElement = useRef<HTMLElement>(null);

  const [searchValue, setSearchValue] = useState("");
  const { pageNo } = usePaginationHook()!;
  const [changeView, setChangeView] = useState(false);

  const options: DropDownOption[] = [
    {
      value: "10",
      label: "10",
    },
    {
      value: "15",
      label: "15",
    },
    {
      value: "25",
      label: "25",
    },
    {
      value: "45",
      label: "45",
    },
  ];

  const userListData = {
    heading: ["Profile", "Name", "Email", "Phone", "Total Buy", "Status", "Join On"],
    body: users,
  };

  function handleIconOnClick() {
    setChangeView((prev) => !prev);
  }

  return (
    <main ref={mainElement} className="flex flex-col items-center">
      <section className=" defWidth mt-5 ">
        <div className="my-5 flex justify-between items-center select-none px-5">
          <h1 className="text-3xl font-bold text-blue-800">User {!changeView ? "List" : "Grid"}</h1>
          {changeView ? (
            <FontAwesomeIcon onClick={handleIconOnClick} className="h-8 cursor-pointer text-blue-800" icon={faTh} />
          ) : (
            <FontAwesomeIcon onClick={handleIconOnClick} className="h-8 cursor-pointer text-blue-800" icon={faThList} />
          )}
        </div>
        <div className="bg-white px-8 py-6 rounded-lg shadow-md">
          <div className="flex justify-between my-3">
            <div className="flex gap-3 items-center">
              <span>Show</span>
              <DropdownSelect selectValue={selectValue} options={options} />
              <span>Entries</span>
            </div>
            <div className="flex gap-3 items-center">
              <span>Filter :</span>
              <input
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                value={searchValue}
                className="outline-none px-4 py-1 rounded-lg shadow-inner border"
                type="text"
              />
            </div>
          </div>
          {!changeView ? (
            <List
              gridCols="10% 15% 25% 15% 10% 10% 10% 5%"
              data={userListData}
              pageNo={pageNo}
              filterValue={searchValue.toLowerCase()}
            />
          ) : (
            <Grid data={userListData} pageNo={pageNo} filterValue={searchValue.toLowerCase()} />
          )}
          <Pagination data={users} noOfEntries={selectValue} />
        </div>
      </section>
      <DocumentScroll />
    </main>
  );
}
