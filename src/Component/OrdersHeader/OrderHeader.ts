export default interface IOrdersHeader {
  loading: boolean;
  ordersCount: number;
  error?: string;
  onRefresh: () => void;
}
