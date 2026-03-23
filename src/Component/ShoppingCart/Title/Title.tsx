import React, { useMemo } from "react";
import type ITitle from "./ITitle";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

const Title: React.FC<ITitle> = () => {
  const container: Variants = useMemo(
    () => ({
      hidden: {},
      visible: { transition: { staggerChildren: 0.02 } },
    }),
    []
  );

  const char: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 8, filter: "blur(2px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.18, ease: "easeOut" },
      },
    }),
    []
  );

  const AnimatedText: React.FC<{ text: string }> = ({ text }) => (
    <motion.span initial="hidden" animate="visible" variants={container}>
      {text.split("").map((c, i) => (
        <motion.span key={i} variants={char}>
          {c}
        </motion.span>
      ))}
    </motion.span>
  );

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xl font-bold text-slate-900">
        <AnimatedText text="Shopping Cart" />
      </p>
      <p className="text-sm text-slate-500">
        <AnimatedText text="Review items and manage quantities before checkout." />
      </p>
    </div>
  );
};

export default Title;