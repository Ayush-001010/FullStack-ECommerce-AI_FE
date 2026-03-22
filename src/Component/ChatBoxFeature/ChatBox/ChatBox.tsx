import React, { useState } from "react";
import type IChatBox from "./IChatBox";
import WelcomeText from "./WelcomeText/WelcomeText";
import { motion , AnimatePresence } from "motion/react";
import MessageBox from "../MessageBox/MessageBox";
import type AIChatInterface from "../../../Interface/AIChatInterface";

const ChatBox: React.FC<IChatBox> = () => {
  const [openWelcomeText, setOpenWelcomeText] = useState<boolean>(true);
  const [chats , setChats] = useState<Array<AIChatInterface>>([]);

  const closeWelcomeTextHandler = (value : string) => {
    setOpenWelcomeText(false);
    console.log("Welcome text closed with value:", value);
    const newChat : AIChatInterface = {
      intent: null,
      missing_fields: null,
      assistant_question: null,
      userResponse: value,
      AskQuestionType: "Text",
      type : "user"
    }
    setChats(prev => [...prev , newChat]);
  }

  return (
    <div className="h-[830px] w-full overflow-auto p-2">
      <AnimatePresence>
        { openWelcomeText && <WelcomeText closeWelcomeTextHandler={closeWelcomeTextHandler} /> }
      </AnimatePresence>
      <AnimatePresence>
          { !openWelcomeText && <MessageBox chats={chats} /> }
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-6 w-full max-w-md flex items-center gap-2"
      >
        <div className="relative w-full">
          <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            disabled={true}
            placeholder="Search discounted products..."
            className="w-full cursor-not-allowed pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ChatBox;
