export const HTTP_CONFIG = {
  baseURL: "http://localhost:8080/api/v1/",
  headers: { "Content-Type": "application/json" },
};

export const APP_API = {
  login: "/auth/login",
  registration: "/registration",
  active1: "/registration/activate/:activeCode",
  active2: "/registration/activate",
  forgotPassword: "/auth/forgot",
  resetPassword: "/auth/reset",
  resetUserData: "/auth/reset/:resetCode",
  userInfo: "/users/account/info",
  editProfile: "/users/account/edit",
  editPassword: "/auth/edit/password",
  bookDetail: "/books/:id",
  addToCart: "/users/cart/add",
  getCart: "/users/getcart",
  deleteCartItem: "users/cart/delete/:id",
  updateCartItem: "/users/cart/update",
  order: "/users/order",
  addressOrder: "/users/address",
  addAddress: "/users/address/add",
  updateAddress: "/users/address/edit/:id",
  deleteAddress: "/users/cart/delete/:id",
};
