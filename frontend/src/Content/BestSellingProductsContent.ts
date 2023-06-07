
import alloyWheel from '../assets/images/BestSellingProducts/wheel.webp';
import shockAbsorber from '../assets/images/BestSellingProducts/shockabsorber.webp';
import exhaust from '../assets/images/BestSellingProducts/exhaust.webp';
import filter from '../assets/images/BestSellingProducts/filter.webp';
import petrolTank from '../assets/images/BestSellingProducts/petroltank.webp';
import disk from '../assets/images/BestSellingProducts/disk.webp';
import spring from '../assets/images/BestSellingProducts/spring.webp';
import helmet from '../assets/images/BestSellingProducts/helmet.webp';

import { ProductCardsProps } from '../components/Home/ProductCards';

export const BestSellingProducts: ProductCardsProps[] = [
  {
    imgSrc: alloyWheel,
    category: "Two wheeler",
    title: "Alloy Wheel",
    currentPrice: 2599,
    prevPrice: null,
    starRating: 4,
  },
  {
    imgSrc: shockAbsorber,
    category: "Two wheeler",
    title: "Shock Absorber",
    currentPrice: 899,
    prevPrice: 1350,
    starRating: 5,
  },
  {
    imgSrc: exhaust,
    category: "Two wheeler",
    title: "Exhaust",
    currentPrice: 4990,
    prevPrice: null,
    starRating: 3,
  },
  {
    imgSrc: filter,
    category: "Two wheeler",
    title: "Filter",
    currentPrice: 299,
    prevPrice: 499,
    starRating: 5,
  },
  {
    imgSrc: petrolTank,
    category: "Two wheeler",
    title: "Petrol Tank",
    currentPrice: 5999,
    prevPrice: null,
    starRating: 2,
  },
  {
    imgSrc: disk,
    category: "Two wheeler",
    title: "Disk",
    currentPrice: 799,
    prevPrice: 1299,
    starRating: 5,
  },
  {
    imgSrc: spring,
    category: "Two wheeler",
    title: "Shock Absorber Spring",
    currentPrice: 699,
    prevPrice: 750,
    starRating: 4,
  },
  {
    imgSrc: helmet,
    category: "Two wheeler",
    title: "Helmet",
    currentPrice: 3299,
    prevPrice: 3999,
    starRating: 5,
  },
];
