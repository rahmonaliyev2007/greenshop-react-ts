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