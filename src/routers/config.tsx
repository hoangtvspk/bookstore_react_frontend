import React, { ReactElement } from "react";
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
import SearchPage from "../pages/Search/Search";
import Address from "../pages/Account/MyAddress/Address";
import AddAddress from "../pages/Account/MyAddress/AddAddress";
import EditAddress from "../pages/Account/MyAddress/EditAddress";
import MyPurchase from "../pages/Account/MyPurchase/MyPurchase";
import OAuth2RedirectHandler from "../pages/Login/oauth2/OAuth2RedirectHandler";
import HomePage from "../pages/HomePage/HomePage";
import { updateKeySearch } from "../redux/slices/keySearchSlice";
import { useDispatch } from "react-redux";
import AccountSideBar from "../components/Layout/SideBar/AccountSideBar";

import {
  closeAccountManage,
  openAccountManage,
} from "../redux/slices/authSlice";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import OrderDetail from "../pages/Account/MyPurchase/OrderDetail";
import VNPayOrder from "../pages/Order/VNPayOrder";

export const appRoutes = {
  home: "/",
  bookDetail: "/detail/:id",
  login: "/login",
  register: "/register",
  active: "/register/active",
  activeAccount: "/activate/:code",
  forgotpassword: "/forgotpassword",
  resetpassword: "/reset/:code",
  myAccount: "/myprofile",
  updateProfile: "/myprofile/update",
  updatePassword: "/password",
  cart: "/cart",
  order: "/checkout",
  purchase: "/mybill",
  orderDetail: "/mybill/orderdetail/:id",
  books: "/search",
  address: "/myaddress",
  addAddress: "/myaddress/add",
  editAddress: "/myaddress/edit/:id",
  vnpayorder: "/vnpayordersuccess",
};

interface IAppComponentConfig {
  path: string;
  component: React.ReactElement | null;
  authRequired?: boolean;
  noAuthRequired?: boolean;
  isAccountManage?: boolean;
}

export const appComponentConfig: IAppComponentConfig[] = [
  {
    path: appRoutes.home,
    component: <Home />,
    isAccountManage: false,
  },
  {
    path: appRoutes.books,
    component: <SearchPage />,
    isAccountManage: false,
  },
  {
    path: appRoutes.bookDetail,
    component: <BookDetail />,
    isAccountManage: false,
  },
  {
    path: appRoutes.login,
    component: <Login />,
    noAuthRequired: true,
    isAccountManage: false,
  },
  {
    path: appRoutes.register,
    component: <Register />,
    noAuthRequired: true,
    isAccountManage: false,
  },
  {
    path: appRoutes.myAccount,
    component: <MyAccount />,
    authRequired: true,
    isAccountManage: true,
  },
  {
    path: appRoutes.updateProfile,
    component: <UpdateProfile />,
    authRequired: true,
    isAccountManage: true,
  },
  {
    path: appRoutes.updatePassword,
    component: <UpdatePassword />,
    authRequired: true,
    isAccountManage: true,
  },
  {
    path: appRoutes.forgotpassword,
    component: <ForgotPassword />,
    noAuthRequired: true,
    isAccountManage: false,
  },
  {
    path: appRoutes.resetpassword,
    component: <ResetPassword />,
    noAuthRequired: true,
    isAccountManage: false,
  },
  {
    path: appRoutes.active,
    component: <Active />,
    noAuthRequired: true,
    isAccountManage: false,
  },
  {
    path: appRoutes.activeAccount,
    component: <ActivateAccount />,
    noAuthRequired: true,
    isAccountManage: false,
  },
  {
    path: appRoutes.cart,
    component: <Cart />,
    isAccountManage: false,
  },
  {
    path: appRoutes.order,
    component: <Order />,
    authRequired: true,
    isAccountManage: false,
  },
  {
    path: appRoutes.address,
    component: <Address />,
    authRequired: true,
    isAccountManage: true,
  },

  {
    path: appRoutes.purchase,
    component: <MyPurchase />,
    authRequired: true,
    isAccountManage: true,
  },
  {
    path: "/oauth2/redirect",
    component: <OAuth2RedirectHandler />,
    isAccountManage: false,
  },
  {
    path: "/account",
    component: <HomePage />,
    isAccountManage: false,
  },
  {
    path: appRoutes.orderDetail,
    component: <OrderDetail />,
    isAccountManage: true,
  },
  {
    path: appRoutes.vnpayorder,
    component: <VNPayOrder />,
    isAccountManage: false,
  },
];

const renderComponent = (route: IAppComponentConfig): React.ReactElement => {
  return (
    <>
      {!route.isAccountManage && (
        <div style={{ marginTop: "0px", paddingTop: 0 }}>{route.component}</div>
      )}
      {route.isAccountManage && (
        <Layout>
          <div className="d-flex">
            <AccountSideBar />
            <Layout style={{ marginLeft: 30 }}>
              <Content
                className="site-layout-background"
                style={{
                  margin: 0,
                  minHeight: 280,
                }}
              >
                {route.component}
              </Content>
            </Layout>
          </div>
        </Layout>
      )}
    </>
  );
};

export const renderAppComponent = (
  data: IAppComponentConfig[],
  isAuth: boolean
) => {
  return (
    <Routes>
      {data.map((route: IAppComponentConfig) => {
        const dispatch = useDispatch();
        if (route.isAccountManage) {
          dispatch(openAccountManage());
        } else dispatch(closeAccountManage());
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
        return (
          <Route path={route.path} element={renderComponent(route)}></Route>
        );
      })}
    </Routes>
  );
};
