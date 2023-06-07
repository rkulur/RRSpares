import { useState } from "react";
import UnderlineEffectLink from "./UnderlineEffectLink";

export default function Advertisement() {
  const [isHovered, setisHovered] = useState(false);
  return (
    <section className="h-[31.25rem] grid grid-rows-1 grid-cols-[25%_50%_25%]">
      <div className={`advertisement bg-left-image flex flex-col items-center justify-center text-white gap-4 px-10`}>
        <h3 className="text-3xl text-center leading-[1.6]">BUY MORE SAVE MORE!</h3>
        <p className="text-2xl font-bold">Save 50% on Wheels</p>
        <button className="bg-white btn">Shop Now</button>
      </div>
      <div className="advertisement bg-center-image bg-center  ">
        <div className="h-[40%] flex flex-col items-center justify-center">
          <h3 className="text-4xl pb-4 font-bold">Motorcycle Special Offer</h3>
          <p className="uppercase">Buy five motorcycle parts and get upto 45% of discount</p>
          <div
            className="w-fit scale-[.8]"
            onMouseEnter={() => {
              console.log("in");
              setisHovered(true);
            }}
            onMouseLeave={() => {
              console.log("out");
              setisHovered(false);
            }}
          >
            <UnderlineEffectLink path="/" title="View More" hoverOn={isHovered} />
          </div>
        </div>
      </div>
      <div className="advertisement bg-right-image flex flex-col justify-center items-center text-white gap-4 px-10">
        <h3 className="text-3xl text-center leading-[1.6]">MEGA SALE</h3>
        <p className="text-2xl font-bold">Lamps and Lights</p>
        <p className="text-2xl ">Flat 30% Off</p>
        <button className="btn">Shop Now</button>
      </div>
    </section>
  );
}
