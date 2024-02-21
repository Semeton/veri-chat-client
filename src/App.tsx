import React from "react";
import Router from "./routes/Routes";

function App() {
  return (
    <div className="">
      <div className="hidden lg:block">This is a large screen</div>
      <div className="lg:hidden">
        <Router />
      </div>
    </div>
  );
}

export default App;
