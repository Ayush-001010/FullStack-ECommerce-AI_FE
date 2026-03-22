import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type UserDetailsInterface from "./Interface/Redux/UserDetailsInterface";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import APICallingServices from "./Services/APICallingServices";
import { setSignedIn } from "./Redux/Slice/UserDetails";
import Home from "./Pages/Home/Home";
import useUserProductAction from "./Services/Hooks/useUserProductAction";
import { setFavoriteProduct } from "./Redux/Slice/UserProductInfo";
import Navbar from "./Component/Navbar/Navbar";
import Search from "./Pages/Search/Search";
import ChatBoxIcon from "./Component/ChatBoxFeature/ChatBoxIcon";
import ChatBox from "./Component/ChatBoxFeature/ChatBox/ChatBox";

const App: React.FC = () => {
  const { isSignedIn } = useSelector(
    (state: any) => state.userDetails as UserDetailsInterface
  );
  const [openChatBox, setOpenChatBox] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { getFavorites } = useUserProductAction();

  const checkUserIsSignedInOrNot = async () => {
    const res = await APICallingServices.postRequest("/auth/check", {});
    // console.log(res);
    if (res.success) {
      dispatch(
        setSignedIn({
          name: res.data.name,
          email: res.data.email,
        })
      );
    }
  };
  const openChatBoxHandler = () => {
    console.log("Chat box icon clicked");
    setOpenChatBox(true);
  };

  useEffect(() => {
    if (!isSignedIn) {
      checkUserIsSignedInOrNot();
    }
  }, [isSignedIn]);
  useEffect(() => {
    if (isSignedIn) {
      getFavorites()
        .then((favorites) => {
          console.log("User's favorite products:", favorites);
          dispatch(setFavoriteProduct(favorites));
        })
        .catch((err) => {
          console.error("Error fetching favorites:", err);
        });
    }
  }, [isSignedIn]);
  return (
    <div className="App">
      <HashRouter>
        <div className="flex min-h-screen w-full">
          <div className="flex min-w-0 flex-1 flex-col">
            {isSignedIn && <Navbar />}
            <Routes>
              <Route path="/" element={isSignedIn ? <Home /> : <Navigate to="/Auth" replace />} />
              <Route path="/Auth" element={isSignedIn ? <Navigate to="/" replace /> : <Auth />} />
              <Route path="/Search" element={isSignedIn ? <Search /> : <Navigate to="/Auth" replace />} />
              <Route path="*" element={<Navigate to={isSignedIn ? "/" : "/Auth"} replace />} />
            </Routes>
            {(isSignedIn && !openChatBox) && <ChatBoxIcon  openChatBoxHandler={openChatBoxHandler} />}
          </div>
          {(isSignedIn && openChatBox) && (
            <div className="w-[400px] border-l border-gray-200 bg-white">
              <ChatBox />
            </div>
          )}
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
