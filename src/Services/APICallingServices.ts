import axios from "axios";

export default class APICallingServices {
  static api = axios.create({ baseURL: "http://localhost:3000" });

  static readonly postRequest = async (controllerName: string, data: any) => {
    try {
      const response = await this.api.post(controllerName, data);
      return response.data;
    } catch (error) {
      console.error("Error in POST request:", error);
      throw error;
    }
  };
  static readonly getRequest = async (controllerName: string) => {
    try {
      const response = await this.api.get(controllerName);
      return response.data;
    } catch (error) {
      console.error("Error in GET request:", error);
      throw error;
    }
  };
}
