import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./services/api/auth/Login";
import LocalStorageStore from "./util/db/LocalStorageStore";

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
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
