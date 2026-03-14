import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type UserDetailsInterface from "./Interface/Redux/UserDetailsInterface";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import APICallingServices from "./Services/APICallingServices";
import { setSignedIn } from "./Redux/Slice/UserDetails";
import  Home from "./Pages/Home/Home";

const App: React.FC = () => {
  const { isSignedIn } = useSelector(
    (state: any) => state.userDetails as UserDetailsInterface
  );
  const dispatch = useDispatch();

  const checkUserIsSignedInOrNot = async () => {
    const res = await APICallingServices.postRequest("/auth/check",{});
    console.log(res);
    if(res.success){
      dispatch(setSignedIn({
        name: res.data.name,
        email: res.data.email,
      }));
    }
  }

  useEffect(()=>{
    if(!isSignedIn){
      checkUserIsSignedInOrNot();
    }
  },[isSignedIn]);
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={isSignedIn ? <Home/> : <Navigate to="/Auth" replace />}/>
          <Route path="/Auth" element={isSignedIn ? <Navigate to="/" replace /> : <Auth />} />
          <Route path="*" element={<Navigate to={isSignedIn ? "/" : "/Auth"} replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;