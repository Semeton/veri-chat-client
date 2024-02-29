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
import Email from "../views/email/Email";
import SentMails from "../views/email/SentMails";
import Vault from "../views/vault/Vault";
import VaultContents from "../views/vault/components/VaultContents";
import SideBar from "../views/layout/SideBar";
import Profile from "../views/profile/Profile";

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
        <Route path="/sidebar" element={<AuthRoute />}>
          <Route path="/sidebar" element={<SideBar />} />
        </Route>
        <Route path="/chats" element={<AuthRoute />}>
          <Route path="/chats" element={<Chat />} />
        </Route>
        <Route path="/sent-requests" element={<AuthRoute />}>
          <Route path="/sent-requests" element={<SentChatRequests />} />
        </Route>
        <Route path="/emails" element={<AuthRoute />}>
          <Route path="/emails" element={<Email />} />
        </Route>
        <Route path="/sent-emails" element={<AuthRoute />}>
          <Route path="/sent-emails" element={<SentMails />} />
        </Route>
        <Route path="/vault" element={<AuthRoute />}>
          <Route path="/vault" element={<Vault />} />
        </Route>
        <Route path="/vault-contents" element={<AuthRoute />}>
          <Route path="/vault-contents" element={<VaultContents />} />
        </Route>
        <Route path="/profile" element={<AuthRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
