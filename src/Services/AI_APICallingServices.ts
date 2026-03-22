import axios from "axios";
import type AIChatInterface from "../Interface/AIChatInterface";

export default class AI_APICallingServices {
    static api = axios.create({ baseURL: "http://127.0.0.1:8000" });

    static readonly postChatRequest = async (chat : Array<AIChatInterface>) => {
        try {
            const response = await this.api.post("/chat", chat);
            console.log("Response from POST request:", response.data);
            return { success : response.data.success, data: response.data.data.response };
        } catch (error) {
            console.error("Error in POST request:", error);
            return { success : false, data: null };
        }
    }
}