import React, { useMemo, useState } from "react";
import type ICart from "./ICart";
import ShoppingCart from "../../Component/ShoppingCart/ShoppingCart";
import useCartAction from "../../Services/Hooks/useCartAction";
import OrderSummary from "../../Component/OrderSummary/OrderSummary";
import Coupon from "../../Component/OrderSummary/Coupon/Coupon";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

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

const Cart: React.FC<ICart> = () => {
  const { cartItems , placeOrder } = useCartAction();
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [messageAPI , contextHandler] = message.useMessage();
  const navigate = useNavigate();

  const subtotal = useMemo(() => {
    return (cartItems || []).reduce((sum: number, item: any) => {
      const unit = Number(item.Price ?? 0);
      const qty = Number(item.quantity ?? 0);
      const discountedUnit = getDiscountedUnitPrice(
        unit,
        Boolean(item.IsDiscounted),
        item.DiscountPercentage
      );
      return sum + discountedUnit * qty;
    }, 0);
  }, [cartItems]);

  const delivery = subtotal > 0 ? 49 : 0;
  const tax = subtotal > 0 ? Math.round(subtotal * 0.02) : 0;

  const safeCouponDiscount = useMemo(
    () => Math.min(Math.max(couponDiscount, 0), subtotal),
    [couponDiscount, subtotal]
  );

  const handleApplyCoupon = (code: string) => {
    setCouponCode(code);

    if (code.toUpperCase() === "FLAT100") setCouponDiscount(100);
    else if (code.toUpperCase() === "SAVE10")
      setCouponDiscount(Math.round(subtotal * 0.1));
    else setCouponDiscount(0);
  };

  const handleCheckout = async () => {
    console.log("Checkout clicked", {
      subtotal,
      couponDiscount: safeCouponDiscount,
      delivery,
      tax,
      couponCode,
    });
    messageAPI.destroy();
    messageAPI.loading({content: "Placing your order...", key: "checkout" , duration: 0});
    const response = await placeOrder();
    messageAPI.destroy();
    if(response.success){
      navigate("/order-confirmation");
    } else {
      messageAPI.error({content: "Failed to place order. Please try again.", key: "checkout"});
    }
  };

  const pageVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const rightColVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/60">
      {contextHandler}
      {/* subtle background glow */}
      <div className="pointer-events-none fixed left-1/2 top-20 h-72 w-[900px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl" />

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-6xl px-4 py-6"
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-8">
            <ShoppingCart cartItems={cartItems} />
          </div>

          {/* Right */}
          <motion.div
            variants={rightColVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4 space-y-4"
          >
            {/* Coupon card shell (better spacing) */}
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)] backdrop-blur">
              <Coupon onApply={handleApplyCoupon} defaultValue={couponCode} />
            </div>

            {/* Order summary shell */}
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)] backdrop-blur">
              <OrderSummary
                subtotal={subtotal}
                discount={safeCouponDiscount}
                delivery={delivery}
                tax={tax}
                currency="INR"
                onCheckout={handleCheckout}
                disabled={(cartItems || []).length === 0}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
