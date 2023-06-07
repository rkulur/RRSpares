import { Link } from "react-router-dom";
import { OfferCards as OffCards } from "../../Content/OfferCardContent";
import { useState } from "react";
import UnderlineEffectLink from "./UnderlineEffectLink";

export default function OfferCards() {
  const [hoverIdx, setHoverIdx] = useState<number | undefined>(undefined);
  const [isHovered, setIsHovered] = useState<boolean | null>(null);
  return (
    <section className="h-[18.1rem] w-full flex justify-center bg-inherit">
      <div className="defWidth border-black flex justify-between items-center  gap-4">
        {OffCards.map((OffCard, index) => {
          return (
            <div className=" w-[25rem] h-[11.6rem] relative px-8 py-6 bg-white" key={index}>
              <div className="w-1/2">
                <Link to={"/"} className="">
                  <h2 className="text-2xl font-bold text-orange-400 hover:text-black transition-all cursor mb-4  ">
                    {OffCard.title}
                  </h2>
                </Link>
                <div
                  className="w-fit"
                  data-index={index}
                  onMouseEnter={(e) => {
                    const hIdx = e.currentTarget.dataset.index;
                    hIdx ? setHoverIdx(parseInt(hIdx)) : setHoverIdx(undefined);
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                  }}
                >
                  <UnderlineEffectLink path="/" title="Shop Now" hoverOn={isHovered === true && index === hoverIdx} />
                </div>
              </div>
              <img className="absolute top-4 right-0 scale-[.85]" src={OffCard.imgSrc} alt={OffCard.imgAlt} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
