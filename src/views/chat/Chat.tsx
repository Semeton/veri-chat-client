import React, { useState } from "react";
import Structure from "../layout/Structure";
import RecentChats from "./components/RecentChats";
import ChatRequests from "./components/ChatRequests";
import ChatQuickAccess from "./components/ChatQuickAccess";

const Chat = () => {
  const [screen, setScreen] = useState("chats");

  const styles = "bg-gray-800 p-3 border-2 border-gray-800";
  const page = (
    <>
      <div className="text-white">
        {/* <div className="mt-4 mb-8">
          Welcome, <b>{userDetails.name}</b>
        </div> */}
        <ChatQuickAccess />
        <div className="mt-10 mb-4">
          <div className="grid grid-cols-2 mb-1">
            <div
              className={
                screen === "chats"
                  ? `${styles} rounded-l-lg bg-gray-950 text-indigo-500 font-bold`
                  : `${styles} rounded-l-lg`
              }
              onClick={() => setScreen("chats")}
            >
              All Chats
            </div>
            <div
              className={
                screen === "requests"
                  ? `${styles} rounded-r-lg bg-gray-950 text-indigo-500 font-bold`
                  : `${styles} rounded-r-lg`
              }
              onClick={() => setScreen("requests")}
            >
              Chat Requests
            </div>
          </div>
          <div className="overflow-y-scroll">
            {screen === "chats" ? <RecentChats /> : <ChatRequests />}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div>
      <Structure page={page} />
    </div>
  );
};

export default Chat;
