import type ProductInterface from "../ProductInterface"

export default interface UserProductsInfoInterface {
    FavoriteProduct: Array<number>;
    CardProducts: Array<IProductCard>;
}

export interface IProductCard {
    productDetails : ProductInterface;
    quantity : number;
}