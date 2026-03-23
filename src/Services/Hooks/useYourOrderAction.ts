import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import APICallingServices from "../APICallingServices"; // adjust path

export type OrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled";

export type OrderProduct = {
  id: number;
  Name: string;
  Description: string;
  Price: number;
  ImageURLs?: string[];
  ImageKey?: string;
};

export type OrderItem = {
  id: number;
  OrderID: string;
  Quantity: number;
  UnitPrice: number;
  DiscountedAmount: number;
  OrderDate: string; // ISO string
  Status: OrderStatus;
  productId: number;
  userId: number;
  product?: OrderProduct;
};

type ApiResponse<T> = { success: boolean; data?: T; errMsg?: string };

const addDays = (d: Date, days: number) => new Date(d.getTime() + days * 86400000);

const daysBetweenCeil = (from: Date, to: Date) =>
  Math.max(0, Math.ceil((to.getTime() - from.getTime()) / 86400000));

const safeParseDate = (value: string) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date() : d;
};

const useYourOrderAction = () => {
  const { email } = useSelector((state: any) => state.userDetails); // or cast to UserDetailsInterface

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [error, setError] = useState<string>("");

  const fetchOrders = useCallback(async () => {
    if (!email) {
      setOrders([]);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = (await APICallingServices.postRequest(
        "/product/getOrderDetails",
        { userEmail: email }
      )) as ApiResponse<OrderItem[]>;

      if (!response?.success) {
        setError(response?.errMsg || "Failed to fetch orders");
        setOrders([]);
        return;
      }

      setOrders(response.data || []);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    // ✅ stable dependency list
    fetchOrders();
  }, [fetchOrders]);

  const getETAInfo = useCallback((orderDateISO: string) => {
    const orderDate = safeParseDate(orderDateISO);
    const etaDate = addDays(orderDate, 5);
    const remainingDays = daysBetweenCeil(new Date(), etaDate);
    return { orderDate, etaDate, remainingDays };
  }, []);

  const helpers = useMemo(() => ({ getETAInfo }), [getETAInfo]);

  return {
    email,
    loading,
    orders,
    error,
    refetch: fetchOrders,
    ...helpers,
  };
};

export default useYourOrderAction;