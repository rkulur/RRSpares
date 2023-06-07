import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import ProductCardsOverlay from "./ProductCardsOverlay";

export type ProductCardsProps = {
  imgSrc: string;
  category: string;
  title: string;
  currentPrice: number;
  prevPrice: number | null;
  starRating: 0 | 1 | 2 | 3 | 4 | 5;
};

export default function ProductCards({
  imgSrc,
  category,
  title,
  currentPrice,
  prevPrice,
  starRating,
}: ProductCardsProps) {
  const [isHovered, setIsHovered] = useState(false);
  function createArray(size: number) {
    const dArr = [];
    for (let i = 0; i < size; i++) {
      dArr.push("");
    }
    return dArr;
  }

  return (
    <div
      className="h-[23.75rem] flex flex-col bg-white relative"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div className="">
        <img src={imgSrc} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="px-5">
        <p className="uppercase text-sm">{category}</p>
        <p className="text-xl text-orange-400 py-2 ">
          {title.substring(0, 18)}
          {title.length > 18 ? "..." : null}
        </p>
        <div className="flex justify-between items-start ">
          <div>
            <p className="font-bold text-lg">₹{currentPrice}.00</p>
            {prevPrice && <p className="text-gray-400 line-through text-sm">₹{prevPrice}.00</p>}
          </div>
          <div className="flex scale-[.8] text-orange-400">
            {createArray(starRating).map((rating, index) => (
              <StarIcon key={index} className="h-6 w-6" />
            ))}
          </div>
        </div>
      </div>
      <ProductCardsOverlay imgSrc={imgSrc} isHovered={isHovered} />
    </div>
  );
}
