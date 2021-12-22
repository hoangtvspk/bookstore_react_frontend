import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MyAccount from "../pages/Account/MyAccount";
import UpdateProfile from "../pages/Account/UpdateProfile";
import ActivateAccount from "../pages/Register/ActivateAccount";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import Home from "../pages/HomePage/HomePage";
import Login from "../pages/Login/Login";
import Active from "../pages/Register/Active";
import Register from "../pages/Register/Register";
import UpdatePassword from "../pages/Account/UpdatePassword";
import BookDetail from "../pages/BookDetail/BookDetail";
import Cart from "../pages/Cart/Cart";
import Order from "../pages/Order/Order";
import Books from "../pages/Books/Books";
import Address from "../pages/Address/Address";
import AddAddress from "../pages/Address/AddAddress";
import EditAddress from "../pages/Address/EditAddress";

export const appRoutes = {
  home: "/",
  bookDetail: "/book/:id",
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
  books: "/books",
  address: "/user/address",
  addAddress: "/user/address/add",
  editAddress: "/user/address/edit/:id",
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
