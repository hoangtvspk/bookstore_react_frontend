import  { FC } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./components/Layout/NavBar/NavBar";
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
