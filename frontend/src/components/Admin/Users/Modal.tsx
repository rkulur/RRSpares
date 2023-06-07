import {
  EllipsisVerticalIcon,
  EnvelopeOpenIcon,
  EyeIcon,
  PencilIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";
import { userList } from "../../../utils/interfaces";

interface ModalProps {
  user: userList;
  setIsModalVisible: (bool: boolean) => void;
}

export default function Modal({ setIsModalVisible, user }: ModalProps) {
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleChangeVisibility(event: MouseEvent) {
      if (modal.current && !modal.current.contains(event.target as Node)) {
        setIsModalVisible(false);
      }
    }

    window.addEventListener("mousedown", handleChangeVisibility);

    return () => {
      window.removeEventListener("mousedown", handleChangeVisibility);
    };
  }, []);

  return (
    <div className="fixed top-0 flex flex-col items-center justify-center bg-slate-900/30 left-0 h-screen w-screen z-20">
      <div ref={modal} className=" w-1/2 bg-white px-6 py-6 flex flex-col justify-center rounded-lg shadow-lg">
        <div className="flex justify-end gap-5 cursor-pointer">
          <PencilIcon className="h-5 w-5" />
          <EllipsisVerticalIcon className="h-5 w-5" />
          <XMarkIcon
            onClick={() => {
              setIsModalVisible(false);
            }}
            className="h-5 w-5"
          />
        </div>
        <div className=" grid md:grid-cols-2 sm:grid-cols-1">
          <div className="flex flex-col  items-center justify-between">
            <div className="text-center">
              <img className="h-28 w-28 mb-4 bg-yellow-300 rounded-lg" src="" alt="" />
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm">{user.email}</p>
            </div>
            <div className=" flex gap-3">
              <div className="flex flex-col items-center">
                <p className="font-semibold">254</p>
                <p>Bought</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">20</p>
                <p>Wish list</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">1200</p>
                <p>Following</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-3">Contact Details</h2>
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-semibold">Email address</h3>
                <p>{user.email}</p>
              </div>
              <div>
                <h3 className="font-semibold">Phone No</h3>
                <p>{user.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold">Birthday</h3>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Address</h3>
                <p>asdfsdfds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
