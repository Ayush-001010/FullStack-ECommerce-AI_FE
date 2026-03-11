import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import type UserDetailsInterface from "./Interface/Redux/UserDetailsInterface";
import { HashRouter, Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

const App: React.FC = () => {
  const { isSignedIn } = useSelector((state: any) => state.userDetails as UserDetailsInterface);


  useEffect(()=>{
    if(!isSignedIn) {
      window.location.hash = "/Auth";
    }
  },[isSignedIn]);

  return (
    <div className="App">
      <HashRouter>
        <Routes>
            <Route path="/Auth" element={<Auth />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;