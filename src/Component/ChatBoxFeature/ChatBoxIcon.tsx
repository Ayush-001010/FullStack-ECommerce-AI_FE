import React from "react";
import type IChatBoxIcon from "./IChatBoxIcon";

const ChatBoxIcon: React.FC<IChatBoxIcon> = ({openChatBoxHandler }) => {

  const handleOpenChatBox = () => {
    openChatBoxHandler();
  } 

  return (
    <div>
      <div className="relative">
        <div onClick={handleOpenChatBox} className={`fixed bottom-10 right-10 z-[9999] flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full bg-[#bfd7ff] shadow-lg transition hover:-translate-y-[2px] hover:bg-[#a8c9ff] hover:shadow-xl active:translate-y-0 active:scale-95`}>
          <i className="bi bi-openai text-[22px] leading-none text-[#001233]" />
        </div>
      </div>
    </div>
  );
};

export default ChatBoxIcon;
