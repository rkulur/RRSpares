import { useState, useEffect, useRef } from "react";
import { BellAlertIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { SearchBar } from "../Home";
import { Link } from "react-router-dom";
import SlideMenu from "./SlideMenu";
import { adminLinks as links } from "../../Content/AdminLinks";

export default function Navbar() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [linkIndex, setLinkIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="flex justify-center flex-col items-center bg-white  border-b-2 ">
        <nav className=" defWidth flex items-center justify-between h-[5rem]">
          <Link to={"/"}>
            <img className="" src="\src\assets\images\Spares---logo_300x300.avif" alt="RR SPARES" />
          </Link>
          <SearchBar />
          <div className="flex gap-8">
            <div className=" flex flex-col items-center clickable">
              <UserCircleIcon className="h-6 w-6" />
              <span>Account</span>
            </div>
            <div className=" flex flex-col items-center clickable">
              <BellAlertIcon className="h-6 w-6" />
              <span>Notification</span>
            </div>
          </div>
        </nav>
      </header>
      <nav className="sticky top-0 z-10 flex flex-col items-center h-[3.5rem] shadow-md bg-white">
        <div className="defWidth flex h-full justify-center items-center">
          <ul className="flex justify-evenly w-full navlinks">
            <li>
              <Link to="/admin">DASHBOARD</Link>
            </li>
            <li>
              <Link to="/admin/users">USERS</Link>
            </li>
            {links.map((link, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setLinkIndex(idx);
                  setIsMenuVisible((previousState) => {
                    return !previousState;
                  });
                }}
                className="relative"
              >
                {link.title.toUpperCase()}
                {isMenuVisible && idx === linkIndex && <SlideMenu menuRef={menuRef} links={link.linkMenu} />}
              </li>
            ))}
            <li>
              <Link to="/admin">REVIEWS</Link>
            </li>
            <li>
              <Link to="/admin">BRANDS</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
