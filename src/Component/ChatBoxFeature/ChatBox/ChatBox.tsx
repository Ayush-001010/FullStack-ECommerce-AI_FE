import React, { useEffect, useState } from "react";
import type IChatBox from "./IChatBox";
import WelcomeText from "./WelcomeText/WelcomeText";
import { motion, AnimatePresence } from "motion/react";
import MessageBox from "../MessageBox/MessageBox";
import type AIChatInterface from "../../../Interface/AIChatInterface";
import useAIChatBox from "../../../Services/Hooks/useAIChatBox";
import { message } from "antd";

const ChatBox: React.FC<IChatBox> = () => {
  const [openWelcomeText, setOpenWelcomeText] = useState<boolean>(true);
  const [chats, setChats] = useState<Array<AIChatInterface>>([]);
  const { callAI } = useAIChatBox();
  const [messageAPI, contextHandler] = message.useMessage();
  const [disableInput, setDisableInput] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");

  const closeWelcomeTextHandler = async (value: string) => {
    setOpenWelcomeText(false);
    console.log("Welcome text closed with value:", value);
    const newChat: AIChatInterface = {
      intent: null,
      missing_fields: null,
      assistant_question: null,
      userResponse: value,
      AskQuestionType: "Text",
      type: "user",
      FinalOuptut: null,
      ToolResponse: null,
    };
    messageAPI.loading({
      content: "Processing your request...",
      key: "processing",
      duration: 0,
    });
    setChats((prev) => [...prev, newChat]);
    const response = await callAI(value, chats);
    messageAPI.destroy();
    console.log("Response from AI API:", response);
    if (response.success) {
      const { data } = response;
      const value = data[0];
      const newChat: AIChatInterface = {
        intent: value.intent,
        missing_fields: value.missing_fields,
        assistant_question: value.assistant_question,
        userResponse: null,
        AskQuestionType: value.AskQuestionType,
        type: "ai",
        FinalOuptut: value.FinalOuptut || null,
        ToolResponse: value.ToolResponse || null,
      };
      setChats((prev) => [...prev, newChat]);
    } else {
      messageAPI.error({
        content: "Failed to process your request. Please try again.",
        key: "processing",
      });
    }
  };
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === "") {
      messageAPI.warning({
        content: "Please enter a message before sending.",
        key: "empty",
      });
      return;
    }
    const newChat: AIChatInterface = {
      intent: chats.length > 0 ? chats[chats.length - 1].intent : null,
      missing_fields:
        chats.length > 0 ? chats[chats.length - 1].missing_fields : null,
      assistant_question:
        chats.length > 0 ? chats[chats.length - 1].assistant_question : null,
      userResponse: value,
      AskQuestionType: "Text",
      type: "user",
      FinalOuptut: null,
      ToolResponse: null,
    };
    messageAPI.loading({
      content: "Processing your request...",
      key: "processing",
      duration: 0,
    });
    setChats((prev) => [...prev, newChat]);
    setValue("");
    const response = await callAI(value, chats);
    messageAPI.destroy();
    console.log("Response from AI API:", response);
    if (response.success) {
      const { data } = response;
      const value = data[0];
      const newChat: AIChatInterface = {
        intent: value.intent,
        missing_fields: value.missing_fields,
        assistant_question: value.assistant_question,
        userResponse: null,
        AskQuestionType: value.AskQuestionType,
        type: "ai",
        FinalOuptut: value.FinalOuptut || null,
        ToolResponse: value.ToolResponse || null,
      };
      setChats((prev) => [...prev, newChat]);
    } else {
      messageAPI.error({
        content: "Failed to process your request. Please try again.",
        key: "processing",
      });
    }
  };
  useEffect(() => {
    console.log("Chats updated:", chats);
    if (chats.length > 1) {
      const lastChat = chats[chats.length - 1];
      if (lastChat.type === "ai") {
        console.log("Last chat is from AI:", lastChat);
        if (lastChat.AskQuestionType === "Text") {
          setDisableInput(false);
        }
      }
    }
  }, [chats]);

  return (
    <div className="h-[830px] w-full overflow-auto p-2">
      {contextHandler}
      <AnimatePresence>
        {openWelcomeText && (
          <WelcomeText closeWelcomeTextHandler={closeWelcomeTextHandler} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!openWelcomeText && <MessageBox chats={chats} />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-6 w-full max-w-2xl"
      >
        {/* Input bar */}
        <form onSubmit={submitHandler}>
          <div
            className={[
              "flex items-center gap-2 rounded-2xl border bg-white p-2 shadow-sm",
              "border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100",
              disableInput ? "opacity-70" : "",
            ].join(" ")}
          >
            {/* Left icon */}
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 text-slate-500">
              <i className="bi bi-search text-base" />
            </div>

            {/* Text input */}
            <input
              type="text"
              disabled={disableInput}
              placeholder="Search discounted products..."
              className={[
                "h-10 flex-1 bg-transparent px-2 text-sm text-slate-900 outline-none",
                "placeholder:text-slate-400",
                "disabled:cursor-not-allowed",
              ].join(" ")}
              onChange={(e) => setValue(e.target.value)}
            />

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 hover:bg-slate-50"
                title="Clear"
                disabled={disableInput}
                onClick={() => setValue("")}
              >
                <i className="bi bi-x-lg text-sm" />
              </button>

              <button
                type="submit"
                disabled={disableInput}
                className={[
                  "inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold",
                  "bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:scale-[0.98]",
                  "transition disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600",
                ].join(" ")}
              >
                <i className="bi bi-send-fill text-sm" />
                Send
              </button>
            </div>
          </div>
        </form>
        {/* Helper row */}
        <div className="mt-2 flex items-center justify-between px-1 text-xs text-slate-500">
          <span className="inline-flex items-center gap-2">
            <i className="bi bi-lightning-charge text-slate-400" />
            Try: “Footware shoes under ₹1000”
          </span>

          <span className="hidden sm:inline-flex items-center gap-2">
            <kbd className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-600">
              Enter
            </kbd>
            to send
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatBox;
