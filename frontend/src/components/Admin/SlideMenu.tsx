import { RefObject } from "react";
import { Link } from "react-router-dom";

type Link = {
  path: string;
  title: string;
};

interface SlideMenuProps {
  menuRef: RefObject<HTMLDivElement>;
  links: Link[];
}

export default function ({ menuRef, links }: SlideMenuProps) {
  return (
    <div
      ref={menuRef}
      className="shadow-lg absolute top-10 -left-1/2 w-[12rem] text-black bg-white rounded-md origin-top animate-slide-menu z-10"
    >
      <ul className="flex flex-col border">
        {links.map((link, idx) => (
          <li key={idx} className=" hover:bg-gray-100 active:text-blue-800 active:no-underline px-5 text-center py-2 ">
            <Link to={link.path}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
