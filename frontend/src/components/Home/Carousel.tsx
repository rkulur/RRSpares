import React, { useEffect, useRef, useState } from "react";
import CarouselItem from "./CarouselItem";
import { carousels } from "../../Content/CarouselContent";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function Carousel() {
  const [slide, setSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (slide === -carousels.length) {
      setSlide(0);
    }
    if (slide > 0) {
      setSlide(-carousels.length + 1);
    }
    console.log(slide);
  }, [slide]);

  function handlePrevBtn() {
    setSlide((prev) => prev + 1);
  }

  function handleNextBtn() {
    setSlide((prev) => prev - 1);
  }

  return (
    <div
      className={`w-full relative carouselHeight overflow-hidden`}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div className={`${!isHovered ? "opacity-0" : null}`}>
        <button className="absolute text-white z-10 scale-[2] left-10 top-1/2 p-2" onClick={handlePrevBtn}>
          <ArrowLeftCircleIcon className="h-6 w-6 hover:text-orange-400 active:scale-[.9] " />
        </button>
        <button className="absolute text-white z-10 scale-[2] right-10 top-1/2 p-2" onClick={handleNextBtn}>
          <ArrowRightCircleIcon className="h-6 w-6 hover:text-orange-400 active:scale-[.9]" />
        </button>
      </div>
      <div className="transition-all duration-500" style={{ transform: `translateX(${slide * 100}%)` }}>
        {carousels.map((c, index) => (
          <div className="h-fit w-full absolute" key={index}>
            <CarouselItem
              bgImg={c.src}
              subHeading={c.subHeading}
              heading={c.heading}
              off={c.off}
              animationDirection={c.direction}
              translate={`translateX(${index * 100}%)`}
              startAnimation={Math.abs(slide) === index ? true : false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
