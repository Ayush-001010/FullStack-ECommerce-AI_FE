import React, { useMemo } from "react";
import type IOrderSummary from "./IOrderSummary";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

const formatMoney = (value: number, currency: "INR" | "USD") =>
  new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
  }).format(value);

const OrderSummary: React.FC<IOrderSummary> = ({
  subtotal,
  discount = 0,
  delivery = 0,
  tax = 0,
  currency = "INR",
  onCheckout,
  disabled = false,
}) => {
  const safeDiscount = useMemo(
    () => Math.min(Math.max(discount, 0), subtotal),
    [discount, subtotal]
  );

  const total = useMemo(
    () => Math.max(0, subtotal - safeDiscount + delivery + tax),
    [subtotal, safeDiscount, delivery, tax]
  );

  const container: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
    },
  };

  const row: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-bold text-slate-900">Order Summary</p>
          <p className="mt-1 text-xs text-slate-500">
            Final amount including delivery and taxes.
          </p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
          <i className="bi bi-receipt text-lg" />
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <motion.div variants={row} className="flex items-center justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900">
            {formatMoney(subtotal, currency)}
          </span>
        </motion.div>

        <motion.div variants={row} className="flex items-center justify-between text-slate-600">
          <span>Discount</span>
          <span className={`font-semibold ${safeDiscount > 0 ? "text-emerald-700" : "text-slate-900"}`}>
            -{formatMoney(safeDiscount, currency)}
          </span>
        </motion.div>

        <motion.div variants={row} className="flex items-center justify-between text-slate-600">
          <span>Delivery</span>
          <span className="font-semibold text-slate-900">
            {formatMoney(delivery, currency)}
          </span>
        </motion.div>

        <motion.div variants={row} className="flex items-center justify-between text-slate-600">
          <span>Tax</span>
          <span className="font-semibold text-slate-900">
            {formatMoney(tax, currency)}
          </span>
        </motion.div>

        <motion.div variants={row} className="my-3 h-px w-full bg-slate-200" />

        <motion.div variants={row} className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900">Total</span>
          <span className="text-xl font-extrabold text-slate-900">
            {formatMoney(total, currency)}
          </span>
        </motion.div>

        <motion.button
          variants={row}
          type="button"
          onClick={onCheckout}
          disabled={disabled || subtotal <= 0}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
        >
          <i className="bi bi-lock-fill" />
          Check Out
        </motion.button>

        <motion.p variants={row} className="mt-2 text-center text-[11px] text-slate-500">
          Secure checkout • Encrypted payments
        </motion.p>
      </div>
    </motion.div>
  );
};

export default OrderSummary;