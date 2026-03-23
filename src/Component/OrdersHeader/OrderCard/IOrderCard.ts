import type { OrderItem } from "../../../Services/Hooks/useYourOrderAction";

export default interface IOrderCard {
  order: OrderItem;
  isOpen: boolean;
  onToggle: () => void;
  getETAInfo: (orderDateISO: string) => { orderDate: Date; etaDate: Date; remainingDays: number };
}