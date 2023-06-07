import React from "react";
import ProductCards from "./ProductCards";
import { RelatedProducts as rProducts } from "../../Content/RelatedProductsContent";

export default function RelatedProducts() {
  return (
    <section className="flex flex-col items-center ">
      <div className="defWidth h-[32.1rem] my-24">
        <h2 className="text-center text-4xl font-bold text-orange-400 pb-2">Related Products</h2>
        <p className="text-center text-lg text-gray-400">Products you may like to purchase</p>
        <div className="grid grid-rows-1 grid-cols-4 mt-10 gap-4">
          {rProducts.map((product, index) => (
            <ProductCards key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
