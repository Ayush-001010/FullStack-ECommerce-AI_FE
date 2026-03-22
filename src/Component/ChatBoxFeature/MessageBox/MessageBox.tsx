import React, { useEffect, useMemo, useRef } from "react";
import type IMessageBox from "./IMessageBox";
import { motion } from "motion/react";

const MessageBox: React.FC<IMessageBox> = ({ chats }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Auto-scroll to bottom on new message
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chats?.length]);

  const containerVariants = useMemo(
    () => ({
      hidden: {},
      visible: { transition: { staggerChildren: 0.01 } },
    }),
    []
  );

  const charVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 8, filter: "blur(2px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    }),
    []
  );

  return (
    <div className="flex h-[740px] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-white">
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
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
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

      <div ref={scrollRef} className="flex-1 overflow-auto px-3 py-4">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
          {chats.map((chat, idx) => {
            const isUser = chat.type === "user";
            const text =
              (isUser ? chat.userResponse : chat.assistant_question) || "";

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex items-end gap-2 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="hidden sm:grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-white">
                    <i className="bi bi-robot text-base" />
                  </div>
                )}

                <div
                  className={[
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                    isUser
                      ? "bg-slate-900 text-white rounded-br-md"
                      : "bg-slate-100 text-slate-900 rounded-bl-md border border-slate-200",
                  ].join(" ")}
                >
                  <motion.span
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                  >
                    {text.split("").map((char, i) => (
                      <motion.span key={`${idx}-${i}`} variants={charVariants}>
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.span>

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

                {isUser && (
                  <div className="hidden sm:grid h-9 w-9 place-items-center rounded-full bg-indigo-600 text-white">
                    <i className="bi bi-person text-base" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer hint */}
      <div className="border-t border-slate-200 bg-white px-4 py-2 text-xs text-slate-500">
        Connect with me: search LinkedIn for{" "}
        <span className="font-medium text-slate-700">
          ayush-chakraborty-401744304
        </span>
      </div>
    </div>
  );
};

export default MessageBox;
