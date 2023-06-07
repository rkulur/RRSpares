import { Link } from "react-router-dom";

interface UnderlineEffectProps {
  path: string;
  title: string;
  hoverOn: boolean;
}

export default function UnderlineEffectLink({ path, title, hoverOn }: UnderlineEffectProps) {
  return (
    <div>
      <Link to={path} className="text-lg font-bold">
        {title}
      </Link>
      <div className="h-[0.1rem] bg-orange-400 overflow-hidden">
        <div
          className={`w-[25%] bg-white h-[inherit] -translate-x-[100%] rounded-full ${
            hoverOn ? "animate-hover-slider-on" : "animate-hover-slider-off"
          }   `}
        ></div>
      </div>
    </div>
  );
}
