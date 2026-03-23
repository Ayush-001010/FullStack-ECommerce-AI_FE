import React from "react";
import type IOrdersHeader from "./OrderHeader";



const OrdersHeader: React.FC<IOrdersHeader> = ({ loading, ordersCount, error, onRefresh }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-2xl font-extrabold tracking-tight text-slate-900">Your Orders</p>
        <p className="mt-1 text-sm text-slate-500">
          Track status, delivery estimate, and product details.
        </p>

        {error ? (
          <p className="mt-2 text-sm font-semibold text-rose-600">
            <i className="bi bi-exclamation-triangle mr-2" />
            {error}
          </p>
        ) : (
          <p className="mt-2 text-xs font-semibold text-slate-500">
            Total orders: <span className="text-slate-900">{ordersCount}</span>
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <i className={`bi ${loading ? "bi-arrow-repeat" : "bi-arrow-clockwise"}`} />
        Refresh
      </button>
    </div>
  );
};

export default OrdersHeader;