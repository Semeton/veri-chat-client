import React from "react";
import Login from "./services/api/auth/Login";
import LocalStorageStore from "./util/db/LocalStorageStore";
import User from "./services/api/auth/User";
import Router from "./routes/Routes";

function App() {
  const token = LocalStorageStore.getValue("token");
  if (!token) {
    const login = new Login();
    const formdata = new FormData();
    formdata.append("email", "balogunsemeton@gmail.com");
    formdata.append("password", "semeton123");
    login.attempt(formdata);
  }
  console.log("token", token);
  if (token) {
    const user = new User();
    user.getUser();
    const userD = LocalStorageStore.getValue("user");
    console.log(userD);
  }
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
