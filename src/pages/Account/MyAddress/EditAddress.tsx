import { Button, Form, Input, message, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import PageTitle from "../../../components/Layout/PageTitle";
import { UserInfo } from "../../../models/auth";
import { httpClient } from "../../../httpClient/httpServices";
import { APP_API } from "../../../httpClient/config";
import { appRoutes } from "../../../routers/config";
import { LoginForm } from "../../../models/login";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Address.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { updateUserInfo, userLogIn } from "../../../redux/slices/authSlice";
import { resolveSrv } from "dns";
import { AddressOrder } from "../../../models/addressOrder";
import { updateAddressData } from "../../../redux/slices/addressSlice";
import PageFooter from "../../../components/Footer/Footer";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */

const EditAddress = () => {
  const userInfo = useSelector(
    (state: RootStateOrAny) => state.authSlice.userInfo as UserInfo
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const [addressForm] = useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      httpClient()
        .get(APP_API.getAddress.replace(":id", id))
        .then((res) => {
          console.log(res);
          addressForm.setFieldsValue({
            id: id,
            provinceCity: res.data.provinceCity,
            districtTown: res.data.districtTown,
            neighborhoodVillage: res.data.neighborhoodVillage,
            address: res.data.address,
          });
          dispatch(updateAddressData(res.data));
          console.log(addressForm.getFieldsValue());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const onFinish = (values: AddressOrder) => {
    setSubmitting(true);
    if (id) {
      httpClient()
        .put(APP_API.updateAddress.replace(":id", id), values)
        .then((res) => {
          message.success("Update Successfully");
          navigate(appRoutes.address);
          dispatch(updateAddressData(res.data));
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setSubmitting(false));
    }
  };

  return (
    <Spin spinning={submitting}>
      <div className="address-background">
        <PageTitle>Add Address</PageTitle>
        <div className="site-layout-background d-flex align-items-center justify-content-center ">
          <Form
            {...layout}
            name="nest-messages"
            form={addressForm}
            onFinish={onFinish}
          >
            <Form.Item name="id" label="ID: " rules={[{ required: true }]}>
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="provinceCity"
              label="Province/City"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="districtTown"
              label="District/Town"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="neighborhoodVillage"
              label="Ward"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Save New Address
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Link to={appRoutes.address}>
                <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
                Turn Back
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
      <PageFooter></PageFooter>
    </Spin>
  );
};

export default EditAddress;
