import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../../httpClient/config";
import { httpClient } from "../../../httpClient/httpServices";
import { AddressOrder } from "../../../models/addressOrder";
import {
  updateAddressData,
  updateAddressListData,
} from "../../../redux/slices/addressSlice";
import { appRoutes } from "../../../routers/config";
import "./Address.css";

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */
function AddAddress() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onLoadUserAddress = () => {
    httpClient()
      .get(APP_API.addressOrder)
      .then((res) => {
        console.log(res.data.length);
        const address: AddressOrder = res.data[
          res.data.length - 1
        ] as AddressOrder;
        dispatch(updateAddressData(address));
        dispatch(updateAddressListData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onAddAddress = (values: AddressOrder) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    httpClient()
      .post(APP_API.addAddress, values)
      .then((res) => {
        message.success("Add Successfully");
        onLoadUserAddress();
        navigate(appRoutes.address);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally();
  };
  return (
    <Form name="nest-messages" onFinish={onAddAddress}>
      <p
        style={{
          color: "#555555",
          fontSize: "14px",
          fontWeight: 400,
          marginBottom: 0,
        }}
      >
        Tỉnh/Thành Phố:{" "}
      </p>
      <Form.Item
        name="provinceCity"
        style={{ width: "100%", marginBottom: 0 }}
        rules={[
          {
            required: true,
            message: "Nhập Tỉnh/Thành Phố!",
          },
        ]}
      >
        <Input placeholder="Tỉnh/Thành Phố" />
      </Form.Item>
      <p
        style={{
          color: "#555555",
          fontSize: "14px",
          fontWeight: 400,
          marginBottom: 0,
        }}
      >
        Quận/Huyện/Thành Phố:{" "}
      </p>
      <Form.Item
        name="districtTown"
        style={{ width: "100%", marginBottom: 0 }}
        rules={[
          {
            required: true,
            message: "Nhập Quận/Huyện/Thành Phố!",
          },
        ]}
      >
        <Input placeholder="Quận/Huyện/Thành Phố" />
      </Form.Item>
      <p
        style={{
          color: "#555555",
          fontSize: "14px",
          fontWeight: 400,
          marginBottom: 0,
        }}
      >
        Xã/Phường:{" "}
      </p>
      <Form.Item
        name="neighborhoodVillage"
        style={{ width: "100%", marginBottom: 0 }}
        rules={[
          {
            required: true,
            message: "Nhập Xã/Phường!",
          },
        ]}
      >
        <Input placeholder="Xã/Phường" />
      </Form.Item>
      <p
        style={{
          color: "#555555",
          fontSize: "14px",
          fontWeight: 400,
          marginBottom: 0,
        }}
      >
        Địa Chỉ:{" "}
      </p>
      <Form.Item
        name="address"
        style={{ width: "100%", marginBottom: 0 }}
        rules={[
          {
            required: true,
            message: "Nhập Địa Chỉ!",
          },
        ]}
      >
        <Input placeholder="Tên người dùng" />
      </Form.Item>
      <div className="d-flex mt-3 d-flex justify-content-end">
        <Form.Item>
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            style={{ backgroundColor: "#ff7f50", border: 0 }}
          >
            Lưu
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default AddAddress;
