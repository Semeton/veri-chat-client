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
import Notification from "../views/notification/Notification";
import Settings from "../views/settings/Settings";
import Privacy from "../views/privacy/Privacy";
import ChatView from "../views/chat/components/ChatView";
import VaultContentView from "../views/vault/components/VaultContentView";
import ChangePassword from "../views/settings/items/ChangePassword";

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
        <Route path="/notifications" element={<AuthRoute />}>
          <Route path="/notifications" element={<Notification />} />
        </Route>
        <Route path="/settings" element={<AuthRoute />}>
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/change-password" element={<AuthRoute />}>
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
        <Route path="/privacy" element={<AuthRoute />}>
          <Route path="/privacy" element={<Privacy />} />
        </Route>
        <Route path="/chatview/:id/:secret" element={<AuthRoute />}>
          <Route path="/chatview/:id/:secret" element={<ChatView />} />
        </Route>
        <Route path="/vault-content/:id/:secret" element={<AuthRoute />}>
          <Route
            path="/vault-content/:id/:secret"
            element={<VaultContentView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
