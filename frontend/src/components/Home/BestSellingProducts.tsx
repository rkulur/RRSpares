import ProductCards from "./ProductCards";
import { BestSellingProducts as bsProducts } from "../../Content/BestSellingProductsContent";

export default function BestSellingProducts() {
  return (
    <section className="h-[57.9rem] flex justify-center my-24">
      <div className="defWidth  border-black">
        <h2 className="text-5xl font-bold text-orange-400 text-center">Bestselling Products</h2>
        <p className="text-lg text-center py-4 text-gray-400 ">Top-rated latest best selling products</p>
        <div className="grid grid-cols-4 grid-rows-2 gap-6 my-4">
          {bsProducts.map((product, index) => (
            <ProductCards key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
