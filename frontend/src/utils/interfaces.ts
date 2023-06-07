import {Dispatch,SetStateAction} from 'react';


export interface MenuProps{
  setIsMenuVisible : Dispatch<SetStateAction<boolean>>
}

export type RecentOrders = [
  {
    orderId : string,
    productName : string, 
    units : string, 
    orderDate : Date,
    orderCost : string, 
    status : 'Processing' | 'Delivered' | 'Cancelled', 
  }
]

export type newCustomers = {
  imgSrc : string,
  name : string,
  noOfOrders : string,
  amount : string,
}

export type topProducts = {
  imgSrc : string,
  title : string,
  description : string,
  price : string,
  oldPrice : string,
  noOfSales : string
}

export type userList = {
  profileImgSrc : string,
  name : string,
  email : string,
  phone : string,
  totalBuy : string,
  status : 'active' | 'inactive',
  joinOn : Date,
}

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
  userDetails : PersonalInformationType & EmailType

}

export interface ChildrenType {
  children : React.ReactNode
}

export interface BrandType {
  name: string;
  logo: string,
  description: string;
  countryOfOrigin: string;
  _id : string;
}

