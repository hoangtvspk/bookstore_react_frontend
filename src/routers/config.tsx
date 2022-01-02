import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MyAccount from "../pages/Account/MyAccount/MyAccount";
import UpdateProfile from "../pages/Account/MyAccount/UpdateProfile";
import ActivateAccount from "../pages/Register/ActivateAccount";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import Home from "../pages/HomePage/HomePage";
import Login from "../pages/Login/Login";
import Active from "../pages/Register/Active";
import Register from "../pages/Register/Register";
import UpdatePassword from "../pages/Account/MyAccount/UpdatePassword";
import BookDetail from "../pages/BookDetail/BookDetail";
import Cart from "../pages/Cart/Cart";
import Order from "../pages/Order/Order";
import Books from "../pages/Books/Books";
import Address from "../pages/Account/MyAddress/Address";
import AddAddress from "../pages/Account/MyAddress/AddAddress";
import EditAddress from "../pages/Account/MyAddress/EditAddress";
import MyPurchase from "../pages/Account/MyPurchase/MyPurchase";
import OAuth2RedirectHandler from "../pages/Login/oauth2/OAuth2RedirectHandler";
import HomePage from "../pages/HomePage/HomePage";

export const appRoutes = {
  home: "/",
  bookDetail: "/books/:id",
  login: "/login",
  register: "/register",
  active: "/register/active",
  activeAccount: "/activate/:code",
  forgotpassword: "/forgotpassword",
  resetpassword: "/reset/:code",
  myAccount: "/my-account",
  updateProfile: "/my-account/update",
  updatePassword: "/my-account/password",
  cart: "/cart",
  order: "/checkout",
  purchase: "userPurchase",
  books: "/books",
  address: "/userAddress",
  addAddress: "/userAddress/add",
  editAddress: "/userAddress/edit/:id",
};

interface IAppComponentConfig {
  path: string;
  component: React.ReactElement | null;
  authRequired?: boolean;
  noAuthRequired?: boolean;
}

export const appComponentConfig: IAppComponentConfig[] = [
  {
    path: appRoutes.home,
    component: <Home />,
  },
  {
    path: appRoutes.books,
    component: <Books />,
  },
  {
    path: appRoutes.bookDetail,
    component: <BookDetail />,
  },
  {
    path: appRoutes.login,
    component: <Login />,
    noAuthRequired: true,
  },
  {
    path: appRoutes.register,
    component: <Register />,
    noAuthRequired: true,
  },
  {
    path: appRoutes.myAccount,
    component: <MyAccount />,
    authRequired: true,
  },
  {
    path: appRoutes.updateProfile,
    component: <UpdateProfile />,
    authRequired: true,
  },
  {
    path: appRoutes.updatePassword,
    component: <UpdatePassword />,
    authRequired: true,
  },
  {
    path: appRoutes.forgotpassword,
    component: <ForgotPassword />,
    noAuthRequired: true,
  },
  {
    path: appRoutes.resetpassword,
    component: <ResetPassword />,
    noAuthRequired: true,
  },
  {
    path: appRoutes.active,
    component: <Active />,
    noAuthRequired: true,
  },
  {
    path: appRoutes.activeAccount,
    component: <ActivateAccount />,
    noAuthRequired: true,
  },
  {
    path: appRoutes.cart,
    component: <Cart />,
  },
  {
    path: appRoutes.order,
    component: <Order />,
    authRequired: true,
  },
  {
    path: appRoutes.address,
    component: <Address />,
    authRequired: true,
  },
  {
    path: appRoutes.addAddress,
    component: <AddAddress />,
    authRequired: true,
  },
  {
    path: appRoutes.editAddress,
    component: <EditAddress />,
    authRequired: true,
  },
  {
    path: appRoutes.purchase,
    component: <MyPurchase />,
    authRequired: true,
  },
  {
    path: "/oauth2/redirect",
    component: <OAuth2RedirectHandler />,
  },
  {
    path: "/account",
    component: <HomePage />,
  },
];

export const renderAppComponent = (
  data: IAppComponentConfig[],
  isAuth: boolean
) => {
  return (
    <Routes>
      {data.map((route: IAppComponentConfig) => {
        console.log(route);
        if (!isAuth && route.authRequired) {
          return (
            <Route
              path={route.path}
              element={<Navigate replace to={appRoutes.login}></Navigate>}
            ></Route>
          );
        } else if (isAuth && route.noAuthRequired) {
          return (
            <Route
              path={route.path}
              element={<Navigate replace to={appRoutes.home}></Navigate>}
            ></Route>
          );
        }
        return <Route path={route.path} element={route.component}></Route>;
      })}
    </Routes>
  );
};
