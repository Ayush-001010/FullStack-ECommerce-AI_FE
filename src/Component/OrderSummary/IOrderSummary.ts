export default interface IOrderSummary {
    subtotal: number;
    discount?: number; // absolute discount amount
    delivery?: number;
    tax?: number;
    currency?: "INR" | "USD";
    onCheckout?: () => void;
    disabled?: boolean;
}