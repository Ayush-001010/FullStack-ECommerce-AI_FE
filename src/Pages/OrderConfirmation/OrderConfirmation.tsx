import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

const OrderConfirmation: React.FC = () => {
  const page: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    }),
    []
  );

  const pop: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: "easeOut" },
      },
    }),
    []
  );

  const stagger: Variants = useMemo(
    () => ({
      hidden: {},
      visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
    }),
    []
  );

  const item: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
    }),
    []
  );

  return (
    <motion.div
      variants={page}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100"
    >
      {/* Background glow */}
      <div className="pointer-events-none fixed left-1/2 top-28 h-72 w-[900px] -translate-x-1/2 rounded-full bg-blue-200/35 blur-3xl" />

      {/* Content */}
      <main className="relative mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main message card */}
          <motion.section
            variants={pop}
            className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)] backdrop-blur"
          >
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.div variants={item} className="flex items-start gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                  <i className="bi bi-check2-circle text-3xl" />
                </div>

                <div className="min-w-0">
                  <p className="text-2xl font-extrabold tracking-tight text-slate-900">
                    Thanks for ordering!
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Your order has been placed successfully.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4"
              >
                <p className="text-sm font-semibold text-slate-900">
                  <i className="bi bi-truck mr-2 text-blue-700" />
                  Delivery estimate
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  Your item will reach you in{" "}
                  <span className="font-extrabold text-slate-900">3–5 days</span>.
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  (We’ll update you when it ships.)
                </p>
              </motion.div>

              <motion.div variants={item} className="mt-6">
                <p className="text-sm font-semibold text-slate-900">What’s next?</p>

                <div className="mt-3 space-y-3">
                  {[
                    {
                      title: "We’re processing your order",
                      desc: "Packing and quality checks are in progress.",
                      icon: "bi-box-seam",
                    },
                    {
                      title: "It will be shipped soon",
                      desc: "You’ll get a message once dispatched.",
                      icon: "bi-send-check",
                    },
                    {
                      title: "Delivery at your doorstep",
                      desc: "Quick and secure delivery.",
                      icon: "bi-house-check",
                    },
                  ].map((step) => (
                    <div
                      key={step.title}
                      className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                    >
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-200">
                        <i className={`bi ${step.icon}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900">{step.title}</p>
                        <p className="mt-0.5 text-sm text-slate-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={item} className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
                >
                  <i className="bi bi-bag-plus" />
                  Continue shopping
                </Link>

                <Link
                  to="/orders"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98]"
                >
                  <i className="bi bi-box-seam" />
                  View orders
                </Link>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Right side info card */}
          <motion.aside
            variants={pop}
            className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)] backdrop-blur"
          >
            <p className="text-base font-extrabold text-slate-900">Need help?</p>
            <p className="mt-1 text-sm text-slate-600">
              If you have any issue, contact our support team.
            </p>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-500">Support hours</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Mon–Sat • 10:00 AM – 6:00 PM
              </p>

              <button
                type="button"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
              >
                <i className="bi bi-headset" />
                Contact support
              </button>
            </div>

            <p className="pt-4 text-center text-[11px] text-slate-500">
              Secure checkout • Encrypted payments
            </p>
          </motion.aside>
        </div>
      </main>
    </motion.div>
  );
};

export default OrderConfirmation;