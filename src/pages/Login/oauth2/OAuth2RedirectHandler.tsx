import { message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../../httpClient/config";
import { httpClient } from "../../../httpClient/httpServices";
import { AddressOrder } from "../../../models/addressOrder";
import {
  updateAddressData,
  updateAddressListData,
} from "../../../redux/slices/addressSlice";
import { userLogIn } from "../../../redux/slices/authSlice";
import { updateCartData } from "../../../redux/slices/cartSlice";

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
  const image: string | null = new URLSearchParams(url.search).get("image");

  console.log(firstName);
  console.log(lastName);
  console.log(email);
  console.log(phoneNumber);
  console.log(userRole);
  console.log(token);
  console.log(image);

  // if (token) {
  //   localStorage.setItem("token", token);
  // }
  // if (firstName) {
  //   localStorage.setItem("firstName", firstName);
  // }
  // if (lastName) {
  //   localStorage.setItem("lastName", lastName);
  // }
  // if (email) {
  //   localStorage.setItem("email", email);
  // }
  // if (phoneNumber) {
  //   localStorage.setItem("phoneNumber", phoneNumber);
  // }
  // if (userRole) {
  //   localStorage.setItem("userRole", userRole);
  // }
  // if (image) {
  //   localStorage.setItem("image", image);
  // }
  console.log("oke");
  const dispatch = useDispatch();
  const userInfo = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    token: token,
    userRole: userRole,
    image: image,
  };
  if (firstName) dispatch(userLogIn(userInfo));
  const onLoadUserAddress = () => {
    httpClient()
      .get(APP_API.addressOrder)
      .then((res) => {
        console.log(res.data.length);
        const address: AddressOrder = res.data[
          res.data.length - 1
        ] as AddressOrder;
        dispatch(updateAddressData(address || {}));
        dispatch(updateAddressListData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onLoadUserCartItems = () => {
    httpClient()
      .post(APP_API.getCart, [])
      .then((res) => {
        dispatch(updateCartData(res.data));
        localStorage.removeItem("noAuthCart");
      })
      .catch((err) => message.error("Cannot load cart data"));
  };
  onLoadUserCartItems();
  onLoadUserAddress();

  return <>{navigate("/account")}</>;
};

export default OAuth2RedirectHandler;
