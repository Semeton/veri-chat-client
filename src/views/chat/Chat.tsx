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
        <div className="mb-4 mt-10">
          <div className="mb-1 grid grid-cols-2">
            <div
              className={
                screen === "chats"
                  ? `${styles} rounded-l-lg bg-gray-950 font-bold text-indigo-500`
                  : `${styles} rounded-l-lg`
              }
              onClick={() => setScreen("chats")}
            >
              All Chats
            </div>
            <div
              className={
                screen === "requests"
                  ? `${styles} rounded-r-lg bg-gray-950 font-bold text-indigo-500`
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
