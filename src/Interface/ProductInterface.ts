export default interface ProductInterface {
  id: number;
  Description: string;
  DiscountPercentage: number;
  ImageURLs?: Array<string>;
  IsBestSeller: boolean;
  IsDiscounted: boolean;
  Name: string;
  NoOfRatings: number;
  Price: number;
  Rating: number;
  Quantity: number;
  categoryId: number;
  ImageKey: string;
  SubCategory: string;
}

export interface CartProductInterface {
  ImageURL: string;
  Name: string;
  Price: number;
  quantity: number;
  productId: number;
  IsDiscounted: boolean;
  DiscountPercentage: string;
  Description: string;
}
