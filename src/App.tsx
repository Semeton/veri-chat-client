import React, { useEffect, useState } from "react";
import LargeScreen from "./LargeScreen";
import Router from "./routes/Routes";
import "./App.css";
import useServiceWorker from "./hooks/useServiceWorker";
import Swal from "sweetalert2";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { updateAvailable, refreshPage } = useServiceWorker();

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };
    if (updateAvailable) {
      Swal.fire({
        title: "Update Available!",
        text: "A new update is available. Click Okay to refresh the app and apply the latest updates.",
        icon: "info",
        iconColor: "#6366f1",
        color: "#fff",
        background: "#1f2937",
        width: "80%",
        confirmButtonColor: "#6366f1",
        confirmButtonText: "Okay",
      }).then((result) => {
        if (result.isConfirmed) {
          refreshPage();
        }
      });
    }
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, [updateAvailable, refreshPage]);
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
