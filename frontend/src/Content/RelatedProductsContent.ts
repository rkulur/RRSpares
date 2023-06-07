import { ProductCardsProps } from "../components/Home/ProductCards";
import hShockAbsorber from "../assets/images/RelatedProducts/hydraulic-shock-absorber.webp";
import aluminumWheel from "../assets/images/RelatedProducts/aluminum-wheel.webp";
import mirrors from "../assets/images/RelatedProducts/mirrors.webp";
import gloves from "../assets/images/RelatedProducts/gloves.webp";

export const RelatedProducts : ProductCardsProps[] = [
  {
    imgSrc: hShockAbsorber,
    category: "Two wheeler",
    title: "Hydraulic Shock Absorber",
    currentPrice: 2599,
    prevPrice: null,
    starRating: 4,
  },
  {
    imgSrc: aluminumWheel,
    category: "Two wheeler",
    title: "Aluminum Wheel",
    currentPrice: 1999,
    prevPrice: 2499,
    starRating: 3,
  },
  {
    imgSrc: mirrors,
    category: "Two wheeler",
    title: "Mirrors",
    currentPrice: 499,
    prevPrice: null,
    starRating: 5,
  },
  {
    imgSrc: gloves,
    category: "Safety",
    title: "Gloves",
    currentPrice: 599,
    prevPrice: null,
    starRating: 5,
  },
];
