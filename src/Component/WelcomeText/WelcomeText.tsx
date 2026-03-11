import React from "react";
import type IWelcomeText from "./IWelcomeText";
import AuthConfig from "../../Config/AuthConfig";
import { motion } from "motion/react";

const WelcomeText: React.FC<IWelcomeText> = ({ text }) => {
  // typed text effect (character by character)
  const AnimatedText = ({
    value,
    startDelay = 0,
    charStagger = 0.04,
  }: {
    value: string;
    startDelay?: number;
    charStagger?: number;
  }) => (
    <motion.span
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { delayChildren: startDelay, staggerChildren: charStagger } },
      }}
      aria-label={value}
    >
      {value.split("").map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 6, filter: "blur(6px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </motion.span>
  );

  return (
    <motion.div initial="hidden" animate="show">
      <div className="my-2">
        <p className="text-4xl text-[#012a4a] font-extrabold tracking-tight drop-shadow-sm">
          <AnimatedText value={AuthConfig.title} startDelay={0.05} charStagger={0.02} />
        </p>

        <motion.p
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { delay: 1.0, duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          }}
          className="my-3 text-sm mx-1 text-[#2c7da0] leading-relaxed drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]"
        >
          <AnimatedText
            value={AuthConfig.sub_description[text]}
            startDelay={1.05}
            charStagger={0.012}
          />
        </motion.p>
      </div>

      <div className="mt-6 space-y-5">
        {AuthConfig.featureNames.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                delay: 1.6 + index * 0.18,
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            className="group rounded-xl p-3 transition-colors duration-200 hover:bg-[#e0c3fc]/25"
          >
            <p className="bg-[#e0c3fc] shadow-sm text-white w-10 h-10 flex justify-center items-center p-4 rounded-full ring-4 ring-white/70 transition-transform duration-200 group-hover:scale-105">
              <span>
                <i className={`${feature.icon} text-[#8187dc] drop-shadow-sm font-bold`} />
              </span>
            </p>

            <p className="mt-2 text-[#003f88] text-lg font-extrabold tracking-tight drop-shadow-sm">
              {feature.name}
            </p>

            <p className="mt-1 text-xs text-[#012a4a]/70 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="flex items-end h-50">
        {AuthConfig.contactInfo.map((contact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                delay: 2.6 + index * 0.12,
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            className="p-6"
          >
            {/* <p><span><i className={contact.icon} /></span></p> */}
            <p className="text-xs font-medium text-[#012a4a]/70 hover:text-[#012a4a] transition-colors cursor-pointer">
              {contact.name}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WelcomeText;