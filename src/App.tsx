import React from "react";
import LargeScreen from "./LargeScreen";
import Router from "./routes/Routes";
import "./App.css";

function App() {
  return (
    <div className="">
      <div className="hidden lg:block background-radial-gradient overflow-hidden">
        <LargeScreen />
      </div>
      <div className="lg:hidden">
        <Router />
      </div>
    </div>
  );
}

export default App;
