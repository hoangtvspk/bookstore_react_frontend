import React, { FC } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import AppLayout from "./components/Layout/NavBar/NavBar";
import OAuth2RedirectHandler from "./pages/Login/oauth2/OAuth2RedirectHandler";
import { appComponentConfig, renderAppComponent } from "./routers/config";

const App: FC = () => {
  const isAuth = useSelector((state: RootStateOrAny) => {
    return state.authSlice.isAuth;
  });

  return (
    <>
      <BrowserRouter>
        <AppLayout>{renderAppComponent(appComponentConfig, isAuth)}</AppLayout>
       
     
      </BrowserRouter>
    </>
  );
};

export default App;
