import { useState, useEffect } from "react";
import Structure from "../layout/Structure";
import { userDetails } from "../../lib/UserDetails";
import QuickAccess from "./components/QuickAccess";
import RecentChats from "../chat/components/RecentChats";
import ChatRequests from "../chat/components/ChatRequests";
import User from "../../services/api/auth/User";

const Dashboard = () => {
  const [screen, setScreen] = useState("chats");

  useEffect(() => {
    if (Object.keys(userDetails).length === 0) {
      let user = new User();
      user.getUser();
    }
  });

  const styles = "bg-gray-800 p-3 border-2 border-gray-800";
  const page = (
    <>
      <div className="text-white">
        <QuickAccess />
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
              Recent Chats
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

export default Dashboard;
