import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AccountSideBar from "../components/Layout/SideBar/AccountSideBar";
import MyAccount from "../pages/Account/MyAccount/MyAccount";
import UpdatePassword from "../pages/Account/MyAccount/UpdatePassword";
import UpdateProfile from "../pages/Account/MyAccount/UpdateProfile";
import Address from "../pages/Account/MyAddress/Address";
import MyFavouriteBooks from "../pages/Account/MyFavouriteBooks/MyFavouriteBooks";
import MyPurchase from "../pages/Account/MyPurchase/MyPurchase";
import OrderDetail from "../pages/Account/MyPurchase/OrderDetail";
import BookDetail from "../pages/BookDetail/BookDetail";
import Cart from "../pages/Cart/Cart";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Events from "../pages/Event/EventsList";
import EventDetail from "../pages/Event/EventsPage";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import {
  default as Home,
  default as HomePage,
} from "../pages/HomePage/HomePage";
import Login from "../pages/Login/Login";
import OAuth2RedirectHandler from "../pages/Login/oauth2/OAuth2RedirectHandler";
import Order from "../pages/Order/Order";
import OrderResult from "../pages/Order/OrderResult";
import VNPayOrder from "../pages/Order/VNPayOrder";
import ActivateAccount from "../pages/Register/ActivateAccount";
import Active from "../pages/Register/Active";
import Register from "../pages/Register/Register";
import SearchPage from "../pages/Search/Search";
import {
  closeAccountManage,
  openAccountManage,
} from "../redux/slices/authSlice";

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
  myFavouriteBooks: "/myfavouritebooks",
  vnpayorder: "/onlinepayordersuccess",
  orderResult: "/orderresult",
  eventDetail: "/eventDetail/:id",
  eventList: "/eventslist",
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
  {
    path: appRoutes.myFavouriteBooks,
    component: <MyFavouriteBooks />,
    isAccountManage: true,
  },
  {
    path: appRoutes.orderResult,
    component: <OrderResult />,
    isAccountManage: false,
  },
  {
    path: appRoutes.eventDetail,
    component: <EventDetail />,
    isAccountManage: false,
  },
  {
    path: appRoutes.eventList,
    component: <Events />,
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
        <Layout style={{ background: "transparent" }}>
          <div className="d-flex" style={{ background: "transparent" }}>
            <AccountSideBar />
            <Layout
              style={{
                marginLeft: 20,
                background: "transparent",
                borderRadius: "20px",
              }}
            >
              <Content
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
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
};
