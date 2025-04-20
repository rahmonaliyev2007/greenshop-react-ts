import { Dispatch } from "@reduxjs/toolkit";
import { SetStateAction } from "react";

export interface CategoriesResponse {
  data: {
    id: number;
    title: string;
    route_path: string;
    count: number;
  }[];
}
export interface SaleBannerResponse {
  data: {
    poster_image_url: string;
    discoount_up_to: number;
  };
}

export interface Slides{
  id: number;
  img: string;
  title: string;
  description: string;
  suptitle: string;
  btn: string;
}

export interface MainMappingProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}
export interface ProductsResponse {
  data: Product[];
  category: string;
  sort: string;
  type: string;
  range_min: string;
  range_max: string;
}
export interface ParamsSet {
  category: string;
  sort: string;
  type: string;
}

export interface UserType{
  email: string,
  password: string,
}
export interface LoginProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
}

export interface ErrorsType{
  email: string,
  password: string,
  apiError: string
}


export interface ShoppingProductType {
  _id: string;
  title: string;
  category: string;
  price: number;
  discount: boolean;
  discount_price: string;
  main_image: string;
  detailed_images: string[];
  short_description: string;
  description: string;
  tags: string[];
  rate: number;
  views: number;
  sold_times: number;
  comments: any[]; 
  created_at: string;
  created_by: string;
  __v: number;
  count: number;
}

export interface User {

    user: {
        _id: string;
        name: string;
        surname: string;
        email: string;
        phone_number: string;
        token: string;
        billing_address: {
            country: string;
            extra_address: string;
            state: string;
            street_address: string;
            town: string;
            zip: string;
        };
    }
}

export interface ProductData {
  data: {
      title: string;
      _id: string;
      main_image: string;
      price: number;
      discount_price: number;
      category: string;
      discount?: boolean;
  }
}

/* 
  ⚠️ Ushbu loyiha muallifi: Abdulaziz. 
  Ruxsatsiz foydalanish taqiqlanadi!
*/