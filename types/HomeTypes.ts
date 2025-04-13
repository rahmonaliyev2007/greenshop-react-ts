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
