import CheckIfAdminProvider from "../Context/CheckIfAdminContext";
import {
  Header,
  Carousel,
  OfferCards,
  BestSellingProducts,
  Advertisement,
  RelatedProducts,
  BikeBlog,
  Footer,
} from "../components/Home";

export default function Home() {
  return (
    <>
      <Header />
      <Carousel />
      <OfferCards />
      <BestSellingProducts />
      <Advertisement />
      <RelatedProducts />
      <BikeBlog />
      <Footer />
    </>
  );
}
