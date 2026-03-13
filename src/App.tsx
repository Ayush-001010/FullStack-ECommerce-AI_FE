import React from "react";
import { useSelector } from "react-redux";
import type UserDetailsInterface from "./Interface/Redux/UserDetailsInterface";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

const App: React.FC = () => {
  const { isSignedIn } = useSelector(
    (state: any) => state.userDetails as UserDetailsInterface
  );

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={isSignedIn ? <div>Okay I am here now</div> : <Navigate to="/Auth" replace />}/>
          <Route path="/Auth" element={isSignedIn ? <Navigate to="/" replace /> : <Auth />} />
          <Route path="*" element={<Navigate to={isSignedIn ? "/" : "/Auth"} replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;