import { useState } from "react";
import { ListProps } from "./List";
import { useDropDownSelect } from "../../../Context/DropDownContext";
import { EnvelopeOpenIcon, EyeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";

interface GridProps extends ListProps {}

export default function Grid({ data, pageNo, filterValue }: GridProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listIndex, setListIndex] = useState<number | undefined>(undefined);
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

  function changeVisibility(bool: boolean) {
    setIsModalVisible(bool);
  }

  function rows(num: number) {
    return Math.ceil(noOfEntries / num);
  }

  return (
    <>
      <div
        className={`grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-rows-1 md:grid-rows-${rows(
          2
        )} lg:grid-rows-${rows(3)} `}
      >
        {updatedData.map((user, idx) => (
          <div>
            <div key={idx} className="grid grid-cols-[30%_70%] items-center px-8 py-6 rounded-lg shadow-lg relative ">
              <img className="h-16 w-16 bg-yellow-300 rounded-lg" src="" alt="" />
              <div>
                <h3 className="font-semibold mb-2">{user.name}</h3>
                <p className="text-sm">
                  <EnvelopeOpenIcon className="h-6 w-6 inline" /> {user.email}
                </p>
                <p className="text-sm mt-2">
                  <PhoneIcon className="h-6 w-6 inline " /> {user.phone}
                </p>
              </div>
              <div className="absolute top-3 right-3 cursor-pointer text-gray-400 active:text-black">
                <EyeIcon
                  onClick={() => {
                    setListIndex(idx);
                    setIsModalVisible(true);
                  }}
                  className="h-6 w-6"
                />
              </div>
            </div>
            {isModalVisible && idx === listIndex && <Modal setIsModalVisible={changeVisibility} user={user} />}
          </div>
        ))}
      </div>
    </>
  );
}
