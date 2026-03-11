import React from "react";
import type IAuth from "./IAuth";
import WelcomeText from "../../Component/WelcomeText/WelcomeText";
import AuthForm from "../../Component/AuthForm/AuthForm";

const Auth: React.FC<IAuth> = () => {
  return (
    <div className="flex m-10 p-5">
      <div className="w-1/2">
        <WelcomeText text="signUp" />
      </div>
      <div className="w-1/2">
        <AuthForm type={"signUp"} />
      </div>
    </div>
  );
};

export default Auth;
