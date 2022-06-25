import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Form, Input } from "antd";
import { useEffect } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
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
