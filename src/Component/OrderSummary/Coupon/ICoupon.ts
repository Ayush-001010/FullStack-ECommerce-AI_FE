export default interface ICoupon {
  onApply?: (code: string) => void;
  disabled?: boolean;
  defaultValue?: string;
}
