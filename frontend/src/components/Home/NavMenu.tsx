import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { MenuProps } from "../../utils/interfaces";

export default function NavMenu({ setIsMenuVisible }: MenuProps) {
  return (
    <div
      className="absolute shadow-xl top-16 left-0 w-full px-5 py-12  grid grid-cols-4 shop gap-10 animate-slide-menu bg-white rounded-lg origin-top z-10"
      onMouseEnter={() => {
        setIsMenuVisible(true);
      }}
      onMouseLeave={() => {
        setIsMenuVisible(false);
      }}
    >
      <ul>
        <h2>Title 1</h2>
        <li className="focus:bg-green-300">Lorem ipsum dolor sit amet.</li>
        <li>
          <Link to="/">Lorem ipsum dolor sit amet.</Link>
        </li>
        <li>
          <Link to="/">Lorem ipsum dolor sit amet.</Link>
        </li>
        <li>
          <Link to="/">Lorem ipsum dolor sit amet.</Link>
        </li>
      </ul>
      <ul>
        <h2>Title 2</h2>
        <li>
          <Link to="/">Lorem ipsum dolor sit amet.</Link>
        </li>
        <li>
          <Link to="/">Lorem ipsum dolor sit amet.</Link>
        </li>
        <li>
          <Link to="/">Lorem ipsum dolor sit amet.</Link>
        </li>
        <li>
          <Link to="/">Lorem ipsum dolor sit amet.</Link>
        </li>
      </ul>
      <ul>
        <h2>Title 3</h2>
        <li>
          <Link to="/">Lorem ipsum dolor sit amet.</Link>
        </li>
        <li>
          <Link to="/">Lorem ipsum dolor sit amet.</Link>
        </li>
        <li>
          <Link to="/">Lorem ipsum dolor sit amet.</Link>
        </li>
        <li>
          <Link to="/">Lorem ipsum dolor sit amet.</Link>
        </li>
      </ul>
      <ul>
        <h2>Title 4</h2>
        <li>
          <Link to="/">Lorem ipsum dolor sit amet.</Link>
        </li>
        <li>
          <Link to="/">Lorem ipsum dolor sit amet.</Link>
        </li>
        <li>
          <Link to="/">Lorem ipsum dolor sit amet.</Link>
        </li>
        <li>
          <Link to="/">Lorem ipsum dolor sit amet.</Link>
        </li>
      </ul>
    </div>
  );
}
