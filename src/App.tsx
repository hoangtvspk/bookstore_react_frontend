import React, { FC } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import AppLayout from "./components/Layout/NavBar/NavBar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import Active from "./pages/Register/Active";
import ActivateAccount from "./pages/ActivateAccount";
import { appRoutes } from "./routers/config";
import MyAccount from "./pages/Account/MyAccount";

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path={appRoutes.login} element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/active" element={<Active />} />
            <Route path="/activate/:code" element={<ActivateAccount />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/reset/:code" element={<ResetPassword />} />
            <Route path={appRoutes.myAccount} element={<MyAccount />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </>
  );
};

export default App;
