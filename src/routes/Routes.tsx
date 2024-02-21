import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../views/auth/SignIn";
import NotFound from "../views/guest/NotFound";
import Onboarding from "../views/guest/Onboarding";
import AuthRoute from "./AuthRoute";
import Dashboard from "../views/home/Dashboard";
import SignUp from "../views/auth/SignUp";
import Chat from "../views/chat/Chat";
import SentChatRequests from "../views/chat/components/SentChatRequests";

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Onboarding />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<AuthRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/chats" element={<AuthRoute />}>
          <Route path="/chats" element={<Chat />} />
        </Route>
        <Route path="/sent-requests" element={<AuthRoute />}>
          <Route path="/sent-requests" element={<SentChatRequests />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
