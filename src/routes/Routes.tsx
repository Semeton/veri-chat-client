import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../components/auth/SignIn";
import NotFound from "../components/guest/NotFound";
import Onboarding from "../components/guest/Onboarding";

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Onboarding />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
