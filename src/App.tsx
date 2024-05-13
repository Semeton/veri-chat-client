import React, { useEffect, useState } from "react";
import LargeScreen from "./LargeScreen";
import Router from "./routes/Routes";
import "./App.css";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);
  return (
    <div className="">
      {isOnline ? (
        <div>
          <div className="hidden lg:block background-radial-gradient overflow-hidden">
            <LargeScreen />
          </div>
          <div className="lg:hidden">
            <Router />
          </div>
        </div>
      ) : (
        <iframe
          src="/offline.html"
          title="Offline Page"
          style={{ width: "100%", height: "100vh", border: "none" }}
        />
      )}
    </div>
  );
}

export default App;
