import React, { useState } from "react";
import type IAuth from "./IAuth";
import WelcomeText from "../../Component/WelcomeText/WelcomeText";
import AuthForm from "../../Component/AuthForm/AuthForm";
import APICallingServices from "../../Services/APICallingServices";
import { message } from "antd";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setSignedIn } from "../../Redux/Slice/UserDetails";
import { useNavigate } from "react-router-dom";
const VITE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const Auth: React.FC<IAuth> = () => {
  const [type , setType] = useState<"signIn" | "signUp">("signIn");
  const [messageAPI , contextHandler] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeType = () => {
    setType((prev) => (prev === "signIn" ? "signUp" : "signIn"));
  }
  const submitHandler = async (values: Record<string, string>) => {
    console.log("Values submitted: ", values);
    if(type === "signIn") {
      const response = await APICallingServices.postRequest("/auth/signin", values);
      console.log("Response from server: ", response);
      if(response.success) {
        messageAPI.success("Sign in successful! Redirecting...");
        dispatch(setSignedIn({ name: response.data.name, email: response.data.email }));
        navigate("/");
      } else {
        messageAPI.error("Sign in failed! Please check your credentials.");
      }
    } else {
      await APICallingServices.postRequest("/auth/register", values);
      messageAPI.success("Registration successful! Please sign in.");
      setType("signIn");
    }
  }
  console.log("Client_ID from env: ", VITE_CLIENT_ID);

  return (
    <div className="flex m-10 p-5">
      {contextHandler}
      <div className="w-1/2">
        <WelcomeText text="signUp" />
      </div>
      <div className="w-1/2">
      <GoogleOAuthProvider clientId={VITE_CLIENT_ID || ""}>
        <AuthForm type={type} changeType={changeType} submitHandler={submitHandler} />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Auth;
