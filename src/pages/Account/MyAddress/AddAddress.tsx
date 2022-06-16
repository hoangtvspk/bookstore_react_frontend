import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, message, Modal, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageFooter from "../../../components/Footer/Footer";
import PageTitle from "../../../components/Layout/PageTitle";
import { APP_API } from "../../../httpClient/config";
import { httpClient } from "../../../httpClient/httpServices";
import { AddressOrder } from "../../../models/addressOrder";
import { UserInfo } from "../../../models/auth";
import {
  updateAddressData,
  updateAddressListData,
} from "../../../redux/slices/addressSlice";
import { appRoutes } from "../../../routers/config";
import "./Address.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */
function AddAddress() {
  const userInfo = useSelector(
    (state: RootStateOrAny) => state.authSlice.userInfo as UserInfo
  );
  const address = useSelector(
    (state: RootStateOrAny) => state.addressSlice.addressItems as AddressOrder
  );
  const dispatch = useDispatch();
  const [accountForm] = useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
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
      setAddVisible(false);
    }, 1000);

    setSubmitting(true);
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
      .finally(() => setSubmitting(false));
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
          <Button type="primary" loading={loading} htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default AddAddress;
