export const HTTP_CONFIG = {
  baseURL: "http://localhost:8080/api/v1/",
};

export const APP_API = {
  login: "/auth/login",
  registration: "/registration",
  active1: "/registration/activate/:activeCode",
  active2: "/registration/activate",
  forgotPassword: "/auth/forgot",
  resetPassword: "/auth/reset",
  resetUserData: "/auth/reset/:resetCode",
};
