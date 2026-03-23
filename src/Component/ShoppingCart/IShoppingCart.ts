import type { CartProductInterface } from "../../Interface/ProductInterface";

export default interface IShoppingCart {
    cartItems: Array<CartProductInterface>;
}