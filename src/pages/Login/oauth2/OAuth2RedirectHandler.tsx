import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogIn } from "../../../redux/slices/authSlice";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const url: Location = window.location;
  const token: string | null = new URLSearchParams(url.search).get("token");
  const firstName: string | null = new URLSearchParams(url.search).get(
    "firstName"
  );
  const lastName: string | null = new URLSearchParams(url.search).get(
    "lastName"
  );
  const email: string | null = new URLSearchParams(url.search).get("email");
  const phoneNumber: string | null = new URLSearchParams(url.search).get(
    "phoneNumber"
  );
  const userRole: string | null = new URLSearchParams(url.search).get(
    "userRole"
  );

  console.log(firstName);
  console.log(lastName);
  console.log(email);
  console.log(phoneNumber);
  console.log(userRole);
  console.log(token);

  if (token) {
    localStorage.setItem("token", token);
  }
  if (firstName) {
    localStorage.setItem("firstName", firstName);
  }
  if (lastName) {
    localStorage.setItem("lastName", lastName);
  }
  if (email) {
    localStorage.setItem("email", email);
  }
  if (phoneNumber) {
    localStorage.setItem("phoneNumber", phoneNumber);
  }
  if (userRole) {
    localStorage.setItem("userRole", userRole);
  }

  console.log("oke");
  const dispatch = useDispatch();
  const userInfo = {
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    email: localStorage.getItem("email"),
    phoneNumber: localStorage.getItem("phoneNumber"),
    token: localStorage.getItem("token"),
    userRole: localStorage.getItem("userRole"),
  };
  dispatch(userLogIn(userInfo));

  return <>{navigate("/account")}</>;
};

export default OAuth2RedirectHandler;
