import React, { useMemo, useState } from "react";
import type IWelcomeText from "./IWelcomeText";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import type UserDetailsInterface from "../../../../Interface/Redux/UserDetailsInterface";

const WelcomeText: React.FC<IWelcomeText> = ({closeWelcomeTextHandler}) => {
  const { name } = useSelector(
    (state: any) => state.userDetails as UserDetailsInterface
  );
  const [showButton, setShowButton] = useState<boolean>(false);

  const headerText = useMemo(() => `Hello ${name}!!`, [name]);
  const briftIntro = useMemo(
    () =>
      "I am a magician. I’m here to help clear your thoughts and guide you to choose product wisely.",
    []
  );

  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const openShowButtonHandler = () => {
    setShowButton(true);
  };

  return (
    <motion.div
      className="flex items-center justify-center h-full w-full flex-col"
      variants={containerVariants}
      exit={{ opacity: 0 }} 
      transition={{ duration: 1.5 }}
    >
      <motion.p
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-3xl text-[#212529] italic font-bold"
      >
        {headerText.split("").map((char, index) => (
          <motion.span
            key={index} // stable key
            variants={charVariants}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mt-4 p-1 text-sm w-full text-wrap mx-2 wrap-break-word text-[#6c757d] font-medium"
        onAnimationComplete={openShowButtonHandler}
      >
        {briftIntro.split("").map((char, index) => (
          <motion.span key={index} variants={charVariants}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
      {showButton && (
        <motion.div className="flex flex-col items-center justify-center">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-6 px-6 py-2 bg-[#c3baba] text-white rounded-lg shadow-md hover:bg-[#b2b2b2] cursor-pointer transition-colors duration-300"
            onClick={() => closeWelcomeTextHandler("Explore products on discount now!")}
          >
            Explore products on discount now!
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-6 px-6 py-2 bg-[#c3baba] text-white rounded-lg shadow-md hover:bg-[#b2b2b2] cursor-pointer transition-colors duration-300"
            onClick={() => closeWelcomeTextHandler("Let’s find the best product for you!")}
          >
            Let’s find the best product for you!
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WelcomeText;
