import React from "react";

export type BlogCardProps = {
  imgSrc: string;
  writer: string;
  date: Date;
  title: string;
  content: string;
};

function prefixZero(str: string) {
  return str.length < 2 ? `0${str}` : str;
}

function getDay(date: Date) {
  return date?.toLocaleDateString("en-US", { weekday: "long" });
}

function getDate(date: Date) {
  return prefixZero(date?.getDate().toString());
}

function getMonth(date: Date) {
  return prefixZero(date?.getMonth().toString());
}

export default function BlogCard({ imgSrc, writer, date, title, content }: BlogCardProps) {
  return (
    <div className="h-[33.8rem] grid grid-cols-1 grid-rows-2">
      <div className="">
        <img src={imgSrc} alt="" />
      </div>
      <div className="flex flex-col justify-evenly px-4">
        <p className="uppercase text-sm">
          by {writer},&nbsp;&nbsp;
          {`${getDay(date)} ${getDate(date)}-${getMonth(date)}-${date?.getFullYear()}`}
        </p>
        <p className="text-xl font-bold">{title}</p>
        <p>{`${content.substring(0, 115)}${content.length > 115 ? "....." : null}`}</p>
        <button className="btn  w-1/2">Veiw Details</button>
      </div>
    </div>
  );
}
