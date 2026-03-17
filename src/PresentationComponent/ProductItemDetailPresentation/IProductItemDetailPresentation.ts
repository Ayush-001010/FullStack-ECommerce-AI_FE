import type ProductInterface from "../../Interface/ProductInterface";

export default interface IProductItemDetailPresentation {
    detail : ProductInterface;
    open : boolean;
    onClose : () => void;
}