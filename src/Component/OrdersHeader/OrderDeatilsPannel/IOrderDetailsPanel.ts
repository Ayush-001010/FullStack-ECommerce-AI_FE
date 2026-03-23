import type { OrderItem } from "../../../Services/Hooks/useYourOrderAction";

export default interface IOrderDetailsPanel {
  order: OrderItem;
  etaDate: Date;
}
