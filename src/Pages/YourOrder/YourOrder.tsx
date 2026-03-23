import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import useYourOrderAction, { type OrderItem } from "../../Services/Hooks/useYourOrderAction";
import type IYourOrder from "./IYourOrder";
import OrdersHeader from "../../Component/OrdersHeader/OrdersHeader";
import OrderCard from "../../Component/OrdersHeader/OrderCard/OrderCard";

const YourOrdersPage: React.FC<IYourOrder> = () => {
  const userEmail = useMemo(() => localStorage.getItem("userEmail") || "", []);
  const { loading, orders, error, refetch, getETAInfo } = useYourOrderAction(userEmail);

  const [openOrderId, setOpenOrderId] = useState<number | null>(null);

  const pageVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const listVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const onToggle = (order: OrderItem) => {
    setOpenOrderId((prev) => (prev === order.id ? null : order.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/70">
      <div className="pointer-events-none fixed left-1/2 top-24 h-72 w-[900px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl" />

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-6xl px-4 py-6"
      >
        <OrdersHeader
          loading={loading}
          ordersCount={orders.length}
          error={error}
          onRefresh={refetch}
        />

        <motion.div variants={listVariants} initial="hidden" animate="visible" className="mt-5 space-y-4">
          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-700">Loading your orders...</p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-200" />
              </div>
            </div>
          )}

          {!loading && orders.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 p-8 text-center shadow-sm">
              <i className="bi bi-box2-heart text-2xl text-slate-400" />
              <p className="mt-2 text-sm font-semibold text-slate-700">No orders found</p>
              <p className="mt-1 text-xs text-slate-500">Place an order and it will appear here.</p>
            </div>
          )}

          {!loading &&
            orders.map((o) => (
              <motion.div key={o.id} variants={itemVariants}>
                <OrderCard
                  order={o}
                  isOpen={openOrderId === o.id}
                  onToggle={() => onToggle(o)}
                  getETAInfo={getETAInfo}
                />
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default YourOrdersPage;