import React from "react";
import type IAuth from "./IAuth";
import WelcomeText from "../../Component/WelcomeText/WelcomeText";

const Auth: React.FC<IAuth> = () => {
  return (
    <div className="flex m-10 p-5">
      <div className="w-1/2">
        <WelcomeText text="signUp" />
      </div>
      <div className="w-1/2">{/* Sign In Form */}</div>
    </div>
  );
};

export default Auth;
