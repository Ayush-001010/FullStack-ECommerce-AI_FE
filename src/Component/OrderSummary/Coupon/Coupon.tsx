import React, { useState } from "react";
import type ICoupon from "./ICoupon";

const Coupon: React.FC<ICoupon> = ({
  onApply,
  disabled = false,
  defaultValue = "",
}) => {
  const [code, setCode] = useState(defaultValue);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">Coupon Code</p>
          <p className="mt-1 text-xs text-slate-500">
            Apply a coupon to get discount on your order.
          </p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-blue-700">
          <i className="bi bi-ticket-perforated" />
        </div>
      </div>

      <div className="mt-4">
        <div className="relative">
          <i className="bi bi-tag absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter coupon code"
            disabled={disabled}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <button
          type="button"
          disabled={disabled || !code.trim()}
          onClick={() => onApply?.(code.trim())}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <i className="bi bi-check2-circle" />
          Apply Coupon
        </button>
      </div>
    </div>
  );
};

export default Coupon;