import React from "react";
import BlogCard from "./BlogCard";
import { blogs } from "../../Content/BlogContent";

export default function BikeBlog() {
  return (
    <section className="flex flex-col items-center h-[42.8rem]">
      <div className="defWidth">
        <h2 className="text-4xl mb-2 font-bold text-orange-400 text-center">Bike Blog</h2>
        <p className="text-center">Latest & Trending</p>
        <div className="grid grid-cols-3 grid-rows-1 gap-4 mt-6">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
