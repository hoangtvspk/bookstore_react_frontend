import { Book, Category } from "../../models/book";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faBookOpen,
  faSeedling,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  Card,
  Rate,
  Comment,
  Collapse,
  Button,
  Divider,
  Form,
  Input,
} from "antd";
import Meta from "antd/lib/card/Meta";
import { httpClient } from "../../httpClient/httpServices";
import { APP_API } from "../../httpClient/config";
import { updateKeySearch } from "../../redux/slices/keySearchSlice";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "../../routers/config";
import { Review } from "../../models/reviews";
import { ReviewRep } from "../../models/reviewRep";
import TextArea from "antd/lib/input/TextArea";
import { loadBookDetail } from "../../redux/slices/bookDetailSlice";
import { AddressOrder } from "../../models/addressOrder";
import { UserInfo } from "../../models/auth";

function Voucher() {
  const userInfo = useSelector(
    (state: RootStateOrAny) => state.authSlice.userInfo as UserInfo
  );
  const address = useSelector(
    (state: RootStateOrAny) => state.addressSlice.addressItems as AddressOrder
  );
  useEffect(() => {}, []);

  return (
    <>
      <div className="bg-white checkCountBox  rounded-3">
        <p
          style={{
            color: "#111111",
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: 0,
          }}
        >
          <FontAwesomeIcon
            className="mr-2"
            icon={faAddressBook}
            color="#339900"
          />
          Thông Tin Giao Hàng
        </p>
        <Divider className="mt-3 mb-1"></Divider>
        <p
          style={{
            color: "#555555",
            fontSize: "14px",
            fontWeight: 400,
            marginBottom: 0,
          }}
        >
          Email: {userInfo.email}
        </p>
        <p
          style={{
            color: "#555555",
            fontSize: "14px",
            fontWeight: 400,
            marginBottom: 0,
          }}
        >
          Tên người nhận:{" "}
        </p>
        <Form.Item
          name="firstName"
          style={{ width: "95%", marginBottom: 0 }}
          rules={[
            {
              required: true,
              message: "Nhập tên người nhận hàng!",
            },
          ]}
        >
          <Input placeholder="Tên người dùng" />
        </Form.Item>

        <p
          style={{
            color: "#555555",
            fontSize: "14px",
            fontWeight: 400,
            marginBottom: 0,
          }}
        >
          Số điện thoại:{" "}
        </p>
        <Form.Item
          name="phoneNumber"
          style={{ width: "95%", marginBottom: 0 }}
          rules={[
            {
              required: true,
              message: "Nhập số điện thoại!",
            },
          ]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <p
          style={{
            color: "#555555",
            fontSize: "14px",
            fontWeight: 400,
            marginBottom: 0,
          }}
        >
          Địa chỉ giao hàng:{" "}
        </p>

        <p
          style={{
            color: "#555555",
            fontSize: "14px",
            fontWeight: 400,
            marginBottom: 0,
          }}
        >
          {address.address}, {address.neighborhoodVillage},{" "}
          {address.districtTown}, {address.provinceCity}
        </p>
      </div>
    </>
  );
}

export default Voucher;
