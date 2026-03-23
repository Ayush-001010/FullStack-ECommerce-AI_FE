import React, { useMemo } from "react";
import type IShoppingCart from "./IShoppingCart";
import Header from "./Header/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const getDiscountedUnitPrice = (
  price: number,
  isDiscounted: boolean,
  discountPercentage: string | number
) => {
  const base = Number(price ?? 0);
  if (!isDiscounted || !base) return base;

  const pct = Number(discountPercentage ?? 0);
  if (!pct || pct <= 0) return base;

  return Math.max(0, Math.round(base - base * (pct / 100)));
};

const ShoppingCart: React.FC<IShoppingCart> = ({ cartItems }) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 18, filter: "blur(2px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: "easeOut" },
    },
  };

  const listVariants: Variants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.14,
          delayChildren: 0.15,
        },
      },
    }),
    []
  );

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Title */}
      <div className="mb-3">
        <p className="text-2xl font-extrabold tracking-tight text-slate-900">
          Shopping Cart
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Review items and manage quantities before checkout.
        </p>
      </div>

      {/* Main card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)]">
        <div className="border-b border-slate-200 px-5 py-4">
          <Header />
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 p-5"
        >
          {cartItems.map((item: any, index: number) => {
            const unit = Number(item.Price ?? 0);
            const qty = Number(item.quantity ?? 0);

            const discountedUnit = getDiscountedUnitPrice(
              unit,
              Boolean(item.IsDiscounted),
              item.DiscountPercentage
            );

            const finalUnit = item.IsDiscounted ? discountedUnit : unit;
            const rowTotal = finalUnit * qty;

            return (
              <motion.div
                key={item.productId ?? `${item.Name}-${index}`}
                variants={rowVariants}
                className="group rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
                  {/* Product */}
                  <div className="md:col-span-7">
                    <div className="flex items-start gap-3">
                      {/* ✅ Improved Image */}
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-black/5">
                        {/* gradient base */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />

                        <Swiper
                          modules={[Autoplay, Navigation, Pagination]}
                          slidesPerView={1}
                          spaceBetween={0}
                          loop
                          navigation
                          pagination={{ clickable: true }}
                          autoplay={{
                            delay: 10000,
                            disableOnInteraction: false,
                          }}
                          className="h-24 w-24"
                        >
                          {String(item.ImageURL || "")
                            .split("|")
                            .filter(Boolean)
                            .map((url: string, idx: number) => (
                              <SwiperSlide
                                key={`${item.Name}-${idx}`}
                                className="h-24 w-24"
                              >
                                {/* center image with padding so it looks premium */}
                                <div className="h-24 w-24 p-2">
                                  <img
                                    src={url}
                                    alt={item.Name}
                                    loading="lazy"
                                    className="h-full w-full rounded-xl object-cover object-center transition duration-500 ease-out will-change-transform group-hover:scale-[1.08]"
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* soft vignette */}
                        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-18px_24px_rgba(15,23,42,0.08)]" />

                        {/* shine sweep on hover */}
                        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                          <div className="absolute -left-10 top-0 h-full w-24 rotate-12 bg-white/35 blur-md" />
                        </div>

                        {/* small dots to suggest carousel */}
                        <div className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1 opacity-70">
                          <span className="h-1 w-1 rounded-full bg-white/70" />
                          <span className="h-1 w-1 rounded-full bg-white/40" />
                          <span className="h-1 w-1 rounded-full bg-white/40" />
                        </div>
                      </div>

                      {/* Name + desc */}
                      <div className="min-w-0">
                        <p className="line-clamp-1 text-sm font-semibold text-slate-900">
                          {item.Name}
                        </p>

                        <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                          {item.Description}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {item.IsDiscounted && (
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                              <i className="bi bi-tags" />
                              {Number(item.DiscountPercentage || 0)}% OFF
                            </span>
                          )}

                          <button
                            type="button"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600 hover:text-rose-700"
                          >
                            <i className="bi bi-trash3" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-3">
                    <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-inner">
                      <button
                        type="button"
                        className="grid h-9 w-9 place-items-center rounded-lg text-slate-700 transition hover:bg-white active:scale-[0.96]"
                      >
                        <i className="bi bi-dash" />
                      </button>

                      <div className="grid h-9 min-w-12 place-items-center px-3 text-sm font-bold text-slate-900">
                        {qty}
                      </div>

                      <button
                        type="button"
                        className="grid h-9 w-9 place-items-center rounded-lg text-slate-700 transition hover:bg-white active:scale-[0.96]"
                      >
                        <i className="bi bi-plus" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 md:text-right">
                    <p className="text-sm font-extrabold text-slate-900">
                      {formatINR(rowTotal)}
                    </p>

                    {item.IsDiscounted ? (
                      <div className="mt-1">
                        <p className="text-[11px] font-semibold text-emerald-700">
                          {formatINR(finalUnit)} / item
                        </p>
                        <p className="text-[11px] font-semibold text-slate-400 line-through">
                          {formatINR(unit)} / item
                        </p>
                      </div>
                    ) : (
                      <p className="mt-1 text-[11px] font-medium text-slate-500">
                        {formatINR(unit)} / item
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {cartItems.length === 0 && (
            <motion.div
              variants={rowVariants}
              className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center"
            >
              <i className="bi bi-bag-x text-2xl text-slate-400" />
              <p className="mt-2 text-sm font-semibold text-slate-700">
                Your cart is empty
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Add some products to see them here.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ShoppingCart;