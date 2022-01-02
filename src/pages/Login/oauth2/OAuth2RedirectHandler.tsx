import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogIn } from "../../../redux/slices/authSlice";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const url: Location = window.location;
  const token: string | null = new URLSearchParams(url.search).get("token");

  if (token) {
    localStorage.setItem("token", token);
  }
  console.log("oke");
  const dispatch = useDispatch();
  const userInfo = {
    firstName: "Hoang",
    lastName: "Google",
    email: "Hoang@google",
    phoneNumber: "0999999",
    token: localStorage.getItem("token"),
    userRole: "USER",
  };
  // dispatch(userLogIn(userInfo));

  return <>{navigate("/account")}</>;
};

export default OAuth2RedirectHandler;
