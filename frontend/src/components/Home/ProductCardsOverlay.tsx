import { DocumentDuplicateIcon, HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardsOverlayProps {
  imgSrc: string;
  isHovered: boolean;
}

export default function ProductCardsOverlay({ imgSrc, isHovered }: ProductCardsOverlayProps) {
  const [isClicked, setisClicked] = useState(false);
  return (
    <div
      className={`bg-white h-full w-full absolute flex flex-col ${
        isHovered ? "opacity-100" : "opacity-0"
      } transition-all duration-500`}
    >
      <div className="opacity-50 ">
        <img src={imgSrc} alt="" />
      </div>
      <div className="flex flex-col gap-7 px-8">
        <div
          className={`flex px-3 justify-between ${
            isHovered ? "translate-y-0" : "-translate-y-[50%]"
          } transition-all duration-500`}
        >
          <Link to={"/"}>
            <DocumentDuplicateIcon className="overlayIcons" />
          </Link>
          <Link
            to={"/"}
            onClick={() => {
              setisClicked((prev) => !prev);
            }}
          >
            {isClicked ? <HeartIconSolid className=" overlayIcons " /> : <HeartIcon className="overlayIcons" />}
          </Link>
          <Link to={"/"}>
            <MagnifyingGlassIcon className="overlayIcons" />
          </Link>
        </div>
        {/* TODO Cart Functionality  */}
        <button
          className={`bg-orange-400 px-4 py-2 w-full hover:bg-blue-800 text-white transition-all  duration-500 ${
            isHovered ? "scale-100" : "scale-90"
          }`}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
