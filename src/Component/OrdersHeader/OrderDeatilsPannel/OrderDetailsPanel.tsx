import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import type { OrderStatus } from "../../../Services/Hooks/useYourOrderAction";
import StatusStepper from "./StatusStepper/StatusStepper";
import type IOrderDetailsPanel from "./IOrderDetailsPanel";

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);

const content: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", staggerChildren: 0.06 },
  },
};

const itemV: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const imgV: Variants = {
  hidden: { opacity: 0, scale: 0.98, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut", delay: 0.08 },
  },
};

const pickFirstImage = (product: any) => {
  if (!product) return "";
  const urls = product.ImageURLs;

  if (Array.isArray(urls)) return urls[0] || "";
  if (typeof urls === "string") {
    // if backend ever returns pipe-separated or comma-separated
    const first = urls.split(/[|,]/).filter(Boolean)[0];
    return first || "";
  }
  return "";
};

const OrderDetailsPanel: React.FC<IOrderDetailsPanel> = ({ order, etaDate }) => {
  const status: OrderStatus = order.Status;
  const product = order.product;

  // IMPORTANT:
  // In your sample data, DiscountedAmount = 1952 when UnitPrice=9760 (20% off amount).
  // That means DiscountedAmount is an "amount off", not final price.
  const total = useMemo(() => {
    const unit = Number(order.UnitPrice ?? 0);
    const qty = Number(order.Quantity ?? 0);
    const off = Number(order.DiscountedAmount ?? 0);

    const finalUnit = Math.max(0, unit - off);
    return finalUnit * qty;
  }, [order.UnitPrice, order.Quantity, order.DiscountedAmount]);

  const finalUnit = useMemo(() => {
    const unit = Number(order.UnitPrice ?? 0);
    const off = Number(order.DiscountedAmount ?? 0);
    return Math.max(0, unit - off);
  }, [order.UnitPrice, order.DiscountedAmount]);

  const firstImage = pickFirstImage(product);
  const [imgOk, setImgOk] = useState(true);

  return (
    <motion.div
      variants={content}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
    >
      <motion.div
        variants={itemV}
        className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center"
      >
        {/* Image */}
        <div className="md:col-span-3">
          <motion.div
            variants={imgV}
            className="relative h-28 w-28 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-black/5"
          >
            {/* background gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />

            {/* image */}
            {firstImage && imgOk ? (
              <>
                <img
                  src={firstImage}
                  alt={product?.Name || "Product"}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onLoad={() => setImgOk(true)}
                  onError={() => setImgOk(false)}
                  className="relative z-10 h-full w-full object-cover object-center"
                />
                {/* vignette */}
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-18px_24px_rgba(15,23,42,0.10)]" />
                {/* hover shine */}
                <div className="pointer-events-none absolute inset-0 opacity-60">
                  <div className="absolute -left-12 top-0 h-full w-28 rotate-12 bg-white/25 blur-md" />
                </div>
              </>
            ) : (
              <div className="relative z-10 grid h-full w-full place-items-center text-slate-400">
                <div className="grid place-items-center">
                  <i className="bi bi-image text-2xl" />
                  <p className="mt-1 text-[10px] font-semibold">No image</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Helpful debug (remove later) */}
          {/* <p className="mt-2 break-all text-[10px] text-slate-400">{firstImage}</p> */}
        </div>

        {/* Info */}
        <div className="md:col-span-6">
          <p className="text-sm font-extrabold text-slate-900">
            {product?.Name ?? "Product"}
          </p>
          <p className="mt-1 line-clamp-2 text-xs text-slate-600">
            {product?.Description ?? ""}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
              <i className="bi bi-hash text-slate-400" />
              Product ID:{" "}
              <span className="text-slate-900">{order.productId}</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
              <i className="bi bi-calendar2 text-slate-400" />
              ETA: <span className="text-slate-900">{formatDate(etaDate)}</span>
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="md:col-span-3 md:text-right">
          <p className="text-xs font-semibold text-slate-500">Total</p>
          <p className="text-lg font-extrabold text-slate-900">{formatINR(total)}</p>

          <div className="mt-2 space-y-1 text-xs text-slate-500">
            <p>
              Qty: <span className="font-bold text-slate-700">{order.Quantity}</span>
            </p>

            {/* show unit / discount breakdown */}
            {Number(order.DiscountedAmount || 0) > 0 ? (
              <div>
                <p className="font-semibold text-emerald-700">
                  {formatINR(finalUnit)} / item
                </p>
                <p className="font-semibold text-slate-400 line-through">
                  {formatINR(Number(order.UnitPrice || 0))} / item
                </p>
              </div>
            ) : (
              <p className="font-semibold text-slate-600">
                {formatINR(Number(order.UnitPrice || 0))} / item
              </p>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemV} className="mt-5">
        <p className="text-sm font-extrabold text-slate-900">Order status</p>
        <p className="mt-1 text-xs text-slate-500">Track your order progress.</p>
        <div className="mt-3">
          <StatusStepper status={status} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderDetailsPanel;