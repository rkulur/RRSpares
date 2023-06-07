import React from "react";

interface CarouselItemProps {
  bgImg: string;
  subHeading: string;
  heading: string;
  off: string;
  animationDirection: string;
  translate: string;
  startAnimation: boolean;
}

export default function CarouselItem({
  bgImg,
  subHeading,
  heading,
  off,
  animationDirection,
  translate,
  startAnimation,
}: CarouselItemProps) {
  const animate = (() => {
    switch (animationDirection) {
      case "left":
        return "animate-from-left";
      case "center":
        return "animate-from-center";
      case "right":
        return "animate-from-right";
      default:
        return "animate-from-left";
    }
  })();

  return (
    <div
      className={`carouselHeight w-full bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center overflow-hidden ${
        startAnimation ? "animate-fade-in-out" : null
      }`}
      style={{ backgroundImage: `url("${bgImg}")`, transform: translate }}
    >
      <div
        className={`defWidth flex 
          ${animationDirection === "right" && "justify-end text-end"}
          ${animationDirection === "left" && "justify-start text-start"}
          ${animationDirection === "center" && "justify-center text-center"}`}
      >
        <div className={`h-[20.6rem] w-[41.2rem] border-white flex flex-col justify-around `}>
          <h3 className={`text-2xl text-white  ${startAnimation ? animate : null}`}>{subHeading.toUpperCase()}</h3>
          <h1
            className={`text-6xl text-orange-400 font-semibold mb-2 ${startAnimation ? animate : null} leading-[1.4]`}
          >
            {heading}
          </h1>
          <h1 className={`text-6xl text-white font-semibold mb-4 ${startAnimation ? animate : null}`}>{off}% Off</h1>
          <div>
            <button className={`btn text-sm w-32 ${startAnimation ? animate : null}`}>SHOP NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
}
