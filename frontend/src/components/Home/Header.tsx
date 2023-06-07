import React, { useEffect, useRef, useState } from "react";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import { Popover } from "@mui/material";
import {
  UserCircleIcon,
  HeartIcon,
  PhoneIcon,
  ClipboardDocumentCheckIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import { useAuthCookie } from "../../hooks/useAuthCookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import axios, { AxiosResponse } from "axios";
import { useCheckAdmin } from "../../Context/CheckIfAdminContext";
import fetchRole from "../Admin/Utils/FetchRole";

export interface GetRoleType {
  success: boolean;
  role: string;
}

export default function Header() {
  const authCookie = useAuthCookie();

  const clipboard = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);

  const { isAdmin, updateIsAdmin } = useCheckAdmin()!;

  useEffect(() => {
    authCookie.get("token") && fetchRole(updateIsAdmin);
  }, []);

  function handleCopyToClipboard(e: React.MouseEvent<HTMLButtonElement>) {
    if (!clipboard.current) {
      return;
    }
    setAnchorEl(e.currentTarget);
    setTimeout(() => {
      setAnchorEl(null);
    }, 500);
    navigator.clipboard.writeText(clipboard.current.innerText);
  }

  return (
    <>
      <header className="bg-white">
        <nav className="nav border-b-2 w-full py-5 ">
          <div className="flex justify-between defWidth items-center ">
            <Link to={"/"}>
              <img src="\src\assets\images\Spares---logo_300x300.avif" alt="Logo" />
            </Link>
            <SearchBar />
            <Link to={`${authCookie.get("token") ? "/account/profile" : "/account/login"}`}>
              <div className="centered">
                <UserCircleIcon className="h-6 w-6" />
                <span>My account</span>
              </div>
            </Link>
            <div className="centered ">
              <HeartIcon className="h-6 w-6" />
              <span>My Wishlist</span>
            </div>
            <div className="centered pb-2">
              {/* TODO : update the value as per the number of items added in the cart */}
              <Cart itemsNum={70} />
              <span>My Cart</span>
            </div>
            {isAdmin && (
              <Link to="/admin">
                <div className="centered">
                  <FontAwesomeIcon icon={faUserGear} />
                  <span>Admin</span>
                </div>
              </Link>
            )}
          </div>
        </nav>
      </header>
      <nav className="nav sticky top-0 z-10 bg-white">
        <div className=" flex justify-between relative h-16 defWidth">
          <ul className="flex gap-14 navlinks ">
            <li>
              <Link to={"/"}>HOME</Link>
            </li>
            <li
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
            >
              <Link to={"/"}>SHOP</Link>
            </li>
            {isHovered && <NavMenu setIsMenuVisible={setIsHovered} />}
            <li>
              <Link to={"/"}>BLOG</Link>
            </li>
            <li>
              <Link to={"/"}>ABOUT US</Link>
            </li>
            <li>
              <Link to={"/"}>SERVICES</Link>
            </li>
          </ul>
          <div className="flex gap-3 justify-center items-center">
            <PhoneIcon className="h-6 w-6" />
            <p className="select-none">
              CALL US NOW :
              <span className="font-semibold select-all px-1" ref={clipboard}>
                123 456 7890
              </span>
            </p>
            <div>
              <button onClick={handleCopyToClipboard}>
                <ClipboardDocumentCheckIcon className="h-6 w-6 hover:text-orange-400" />
              </button>
              <Popover
                id={Boolean(anchorEl) ? "simple-popover" : undefined}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                onClose={() => {
                  setAnchorEl(null);
                }}
              >
                <div className=" flex flex-col items-center p-2 ">
                  <CheckCircleIcon className="h-6 w-6" />
                  <span>Copied!</span>
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// TODO
