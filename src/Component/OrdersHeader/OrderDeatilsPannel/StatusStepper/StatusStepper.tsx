import React, { useMemo } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import type { OrderStatus } from "../../../../Services/Hooks/useYourOrderAction";
import type IStatusStepper from "./IStatusStepper";

const steps: { key: OrderStatus; label: string; icon: string }[] = [
  { key: "Pending", label: "Pending", icon: "bi-hourglass-split" },
  { key: "Shipped", label: "Shipped", icon: "bi-truck" },
  { key: "Delivered", label: "Delivered", icon: "bi-check2-circle" },
  { key: "Cancelled", label: "Cancelled", icon: "bi-x-circle" },
];

const indexByStatus: Record<OrderStatus, number> = {
  Pending: 0,
  Shipped: 1,
  Delivered: 2,
  Cancelled: 3,
};

const StatusStepper: React.FC<IStatusStepper> = ({ status }) => {
  const activeIndex = indexByStatus[status];

  const progressPct = useMemo(() => {
    if (status === "Cancelled") return 100;
    return (activeIndex / 2) * 100; // Pending 0, Shipped 50, Delivered 100
  }, [activeIndex, status]);

  const progressColor =
    status === "Cancelled" ? "bg-rose-500" : status === "Delivered" ? "bg-emerald-500" : "bg-blue-500";

  const wrap: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div variants={wrap} initial="hidden" animate="visible">
      {/* Track */}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <motion.div
          className={`h-full ${progressColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>

      {/* Steps */}
      <div className="mt-3 grid grid-cols-4 gap-2">
        {steps.map((s, idx) => {
          const isActive =
            status === "Cancelled" ? s.key === "Cancelled" : idx <= activeIndex && s.key !== "Cancelled";

          const tone = isActive
            ? status === "Cancelled"
              ? "bg-rose-50 text-rose-700 ring-rose-200"
              : status === "Delivered" && idx === 2
                ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                : "bg-blue-50 text-blue-700 ring-blue-200"
            : "bg-white text-slate-500 ring-slate-200";

          return (
            <div key={s.key} className="min-w-0">
              <div className={`flex items-center justify-center gap-2 rounded-2xl px-2 py-2 text-xs font-bold ring-1 ${tone}`}>
                <i className={`bi ${s.icon}`} />
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StatusStepper;