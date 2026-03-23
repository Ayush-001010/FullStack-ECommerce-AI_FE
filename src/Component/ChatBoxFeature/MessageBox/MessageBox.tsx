import React, { useEffect, useMemo, useRef } from "react";
import type IMessageBox from "./IMessageBox";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import ProductPresentation from "../../../PresentationComponent/ProductPresentation/ProductPresentation";

const MessageBox: React.FC<IMessageBox> = ({ chats }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chats?.length]);

  // Slower typing feel
  const containerVariants: Variants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.035,
        },
      },
    }),
    []
  );

  const charVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10, filter: "blur(2px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.18, ease: "easeOut" },
      },
    }),
    []
  );

  return (
    <div className="flex h-[740px] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-white shadow-sm">
            <i className="bi bi-robot text-lg" />
          </div>

          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900">
              E-Commerce AI
            </p>
            <p className="text-xs text-slate-500">
              Ask about discounts, products, orders
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 active:scale-[0.98]"
          onClick={() =>
            scrollRef.current?.scrollTo({
              top: scrollRef.current.scrollHeight,
              behavior: "smooth",
            })
          }
          title="Scroll to bottom"
        >
          <i className="bi bi-arrow-down" />
          Bottom
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto bg-slate-50 px-3 py-4"
      >
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
          {chats.map((chat, idx) => {
            const isUser = chat.type === "user";
            const text =
              (isUser ? chat.userResponse : chat.assistant_question) || "";
            const { FinalOuptut, ToolResponse } = chat;
            
            if (FinalOuptut) {
              const items = Array.isArray(ToolResponse) ? ToolResponse : [];
            
              return (
                <motion.div
                  key={`products-${idx}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="w-full"
                >
                  <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">
                          Results
                          <span className="ml-2 inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                            {items.length}
                          </span>
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                          {typeof FinalOuptut === "string"
                            ? FinalOuptut
                            : "Here are the products we found for you."}
                        </p>
                      </div>
            
                      <div className="shrink-0 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                        <i className="bi bi-tags" />
                        Discounted
                      </div>
                    </div>
            
                    {/* Products list */}
                    <div className="p-3">
                      {items.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center">
                          <i className="bi bi-inbox text-xl text-slate-400" />
                          <p className="mt-2 text-sm font-medium text-slate-700">
                            No products found
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Try a different category or sub category.
                          </p>
                        </div>
                      ) : (
                        <div className="flex gap-3 overflow-x-auto pb-2 pr-2 [scrollbar-width:thin]">
                          {items.map((toolRes, toolIdx) => (
                            <motion.div
                              key={`${idx}-tool-${toolIdx}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35, delay: toolIdx * 0.04 }}
                              className="shrink-0"
                            >
                              {/* Force nice sizing inside horizontal scroll */}
                              <div className="w-[320px] sm:w-[340px]">
                                <ProductPresentation details={{
                                    id: toolRes.id,
                                    Name: toolRes.Name,
                                    Price: toolRes.Price,
                                    ImageKey : toolRes.ImageKey,
                                    IsDiscounted: toolRes.IsDiscounted,
                                    Description: toolRes.Description,
                                    DiscountPercentage : toolRes.DiscountPercentage,
                                    Quantity : toolRes.Quantity,
                                    categoryId : toolRes.categoryId,
                                    IsBestSeller : toolRes.IsBestSeller,
                                    NoOfRatings : toolRes.NoOfRatings,
                                    Rating : toolRes.Rating
                                }} />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className={`min-w-0 flex items-end gap-2 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {/* Assistant avatar */}
                {!isUser && (
                  <div className="hidden h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-900 text-white shadow-sm sm:grid">
                    <i className="bi bi-robot text-base" />
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={[
                    "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                    "overflow-hidden break-words whitespace-pre-wrap",
                    isUser
                      ? "bg-slate-900 text-white rounded-br-md"
                      : "bg-white text-slate-900 rounded-bl-md border border-slate-200",
                  ].join(" ")}
                >
                  <motion.span
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="block break-words whitespace-pre-wrap"
                  >
                    {text.split("").map((char, i) => (
                      <motion.span
                        key={`${idx}-${i}`}
                        variants={charVariants}
                        className="inline"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>

                  {/* Meta */}
                  <div
                    className={[
                      "mt-2 flex items-center justify-end gap-1 text-[10px]",
                      isUser ? "text-white/70" : "text-slate-500",
                    ].join(" ")}
                  >
                    {isUser ? (
                      <>
                        <span>You</span>
                        <i className="bi bi-check2-all" />
                      </>
                    ) : (
                      <>
                        <span>Assistant</span>
                        <i className="bi bi-stars" />
                      </>
                    )}
                  </div>
                </div>

                {/* User avatar */}
                {isUser && (
                  <div className="hidden h-9 w-9 shrink-0 place-items-center rounded-full bg-indigo-600 text-white shadow-sm sm:grid">
                    <i className="bi bi-person text-base" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-white px-4 py-2 text-xs text-slate-500">
        <div className="flex items-start gap-2">
          <i className="bi bi-linkedin mt-[1px] text-sm text-[#0A66C2]" />
          <span className="min-w-0 break-words leading-snug">
            Connect with me: search LinkedIn for{" "}
            <span className="font-medium text-slate-700">
              ayush-chakraborty-401744304
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
