import React from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";
import type { OrderItem } from "../../../Services/Hooks/useYourOrderAction";
import type IOrderCard from "./IOrderCard";
import OrderDetailsPanel from "../OrderDeatilsPannel/OrderDetailsPanel";

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);

const toneByStatus = (status: OrderItem["Status"]) => {
  switch (status) {
    case "Delivered":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    case "Shipped":
      return "bg-blue-50 text-blue-700 ring-blue-200";
    case "Cancelled":
      return "bg-rose-50 text-rose-700 ring-rose-200";
    default:
      return "bg-amber-50 text-amber-800 ring-amber-200";
  }
};

const panel: Variants = {
  hidden: { opacity: 0, height: 0, y: -8 },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -8,
    transition: { duration: 0.35, ease: "easeInOut" },
  },
};

const OrderCard: React.FC<IOrderCard> = ({
  order,
  isOpen,
  onToggle,
  getETAInfo,
}) => {
  const { orderDate, etaDate, remainingDays } = getETAInfo(order.OrderDate);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/90 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.5)] backdrop-blur">
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-extrabold text-slate-900">
              Order <span className="text-slate-500">#{order.OrderID}</span>
            </p>

            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ring-1 ${toneByStatus(
                order.Status
              )}`}
            >
              <span className="h-2 w-2 rounded-full bg-current opacity-70" />
              {order.Status}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Ordered:{" "}
            <span className="font-semibold text-slate-700">
              {formatDate(orderDate)}
            </span>{" "}
            • ETA:{" "}
            <span className="font-semibold text-slate-700">
              {formatDate(etaDate)}
            </span>
          </p>

          <p className="mt-2 text-sm font-semibold text-slate-800">
            {order.Status === "Delivered"
              ? "Delivered successfully."
              : order.Status === "Cancelled"
              ? "This order was cancelled."
              : remainingDays === 0
              ? "Arriving today."
              : `Your order will reach in ${remainingDays} day${
                  remainingDays > 1 ? "s" : ""
                }.`}
          </p>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
        >
          <i className={`bi ${isOpen ? "bi-eye-slash" : "bi-eye"}`} />
          {isOpen ? "Hide" : "Show"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="px-5 pb-5"
          >
            <OrderDetailsPanel order={order} etaDate={etaDate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderCard;
