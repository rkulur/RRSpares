import { Dispatch, SetStateAction } from "react";

export interface MenuProps {
  setIsMenuVisible: Dispatch<SetStateAction<boolean>>;
}

export type RecentOrders = [
  {
    orderId: string;
    productName: string;
    units: string;
    orderDate: Date;
    orderCost: string;
    status: "Processing" | "Delivered" | "Cancelled";
  }
];

export type newCustomers = {
  imgSrc: string;
  name: string;
  noOfOrders: string;
  amount: string;
};

export type topProducts = {
  imgSrc: string;
  title: string;
  description: string;
  price: string;
  oldPrice: string;
  noOfSales: string;
};

export type userList = {
  profileImgSrc: string;
  name: string;
  email: string;
  phone: string;
  totalBuy: string;
  status: "active" | "inactive";
  joinOn: Date;
};

export interface DropDownOption {
  value: string;
  label: string;
}

export interface ResTokenType {
  success: Boolean;
  token: string;
  expireDays: number;
}

export interface ResType {
  success: Boolean;
  message: string;
}

export interface PersonalInformationType {
  firstName: string;
  lastName: string;
}

export interface EmailType {
  email: string;
}

export interface UserDetailsType extends ResType {
  userDetails: PersonalInformationType & EmailType;
}

export interface ChildrenType {
  children: React.ReactNode;
}

export interface BrandType {
  name: string;
  logo: string;
  description: string;
  countryOfOrigin: string;
  _id: string;
}

export interface ModelType {
  name: string;
  brandId: string;
  modelImg: string;
  description: string;
  variants: string[];
  _id: string;
  brand : BrandType
}

export interface BrandResType extends ResType {
  brand: BrandType;
  brands ?: BrandType[];
}

export interface ModelResType extends ResType {
  model: ModelType;
  models : ModelType[];
}

export type StateWithIdxType = {
  idx: number | null;
  state: boolean;
};

export interface Alert {
  state: boolean;
  type: "success" | "error";
  message: string;
}

export type BrandSelect = {
  logo: string;
  name: string;
};

export type SelectOptionType = {
  value: string;
  label: string;
  image: string;
  id : string
};

export type PartCategoryType = {
  _id : string,
  categoryName : string;
}

