import React from "react";
import ChatPage from "./ChatBox";
import FriendDetails from "./FriendDetails";

const ChatUser = () => {
  return (
    <div className="w-full h-full flex">
      <div className="flex-1">
        <ChatPage />
      </div>
      <div className="w-80 border-l border-gray-200 bg-gray-50">
        <FriendDetails />
      </div>
    </div>
  );
};

export default ChatUser;
