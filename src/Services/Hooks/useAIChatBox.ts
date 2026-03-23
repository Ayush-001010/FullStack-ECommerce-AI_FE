import type AIChatInterface from "../../Interface/AIChatInterface";
import AI_APICallingServices from "../AI_APICallingServices";

const useAIChatBox = () => {
  const callAI = async (message: string, chats: Array<AIChatInterface>) => {
    const newChat: AIChatInterface = {
      intent: chats.length > 0 ? chats[chats.length - 1].intent : null,
      missing_fields:
        chats.length > 0 ? chats[chats.length - 1].missing_fields : null,
      assistant_question:
        chats.length > 0 ? chats[chats.length - 1].assistant_question : null,
      userResponse: message,
      AskQuestionType: "Text",
      type: "user",
      FinalOuptut: null,
      ToolResponse: null,
    };
    const response = await AI_APICallingServices.postChatRequest([newChat]);
    return response;
  };

  return { callAI };
};

export default useAIChatBox;
