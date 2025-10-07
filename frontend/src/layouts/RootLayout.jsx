import React, { useEffect, useState } from "react";
import { Outlet,NavLink,useParams,useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import WelcomeMessage from "../components/WelcomeMessage";
import socket from "../utils/socket";
import { tokenDecoded } from "../utils/currentUserInformation";

const RootLayout = () => {
  const [token] = useState(localStorage.getItem("token"))
  const [currentUserData,setCurrentUserData ] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    if(!token || token === ""){
    return navigate("/authentication")
  }else{
    setCurrentUserData(tokenDecoded)
    const decoded = tokenDecoded(token)
    setCurrentUserData(decoded)
    socket.emit("register", {currentUserId:decoded?.id})
  }

  }, [])

  const { userId } = useParams();
  return (
    <div className="w-screen max-h-screen overflow-hidden">
      <nav className="w-full min-h-16 px-5 py-2 flex items-center border-b border-gray-200">
        <NavLink to="/">
          <h1 className="text-xl font-semibold">Chat</h1>
        </NavLink>
      </nav>
      <main className="w-full h-[calc(100vh-4rem)] flex items-stretch justify-start">
        <Sidebar />
        {userId === undefined ? <WelcomeMessage /> : <Outlet />}
        
      </main>
    </div>
  );
};

export default RootLayout;
