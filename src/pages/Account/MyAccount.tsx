import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/Layout/PageTitle";
import { UserInfo } from "../../models/auth";
import { httpClient } from "../../httpClient/httpServices";
import { APP_API } from "../../httpClient/config";
import { appRoutes } from "../../routers/config";
import { Link } from "react-router-dom";
import "./MyAccount.css";
import {
  faCartArrowDown,
  faHome,
  faKey,
  faSignInAlt,
  faSignOutAlt,
  faTools,
  faUser,
  faUserCircle,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateUserInfo } from "../../redux/slices/authSlice";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */

const MyAccount = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(
    (state: RootStateOrAny) => state.authSlice.userInfo as UserInfo
  );

  const [accountForm] = useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  useEffect(() => {
    httpClient()
      .get(APP_API.userInfo)
      .then((res) => {
        console.log(res);
        accountForm.setFieldsValue(res.data);

        console.log(accountForm);
      });
  }, []);

  return (
    <div className="profile-background">
      <PageTitle>My Profile</PageTitle>
      <div className="site-layout-background d-flex align-items-center justify-content-center ">
        <Form {...layout} name="login" form={accountForm} onFinish={onFinish}>
          <Form.Item name="firstName" label="First name">
            <Input disabled />
          </Form.Item>
          <Form.Item name="lastName" label="Last name">
            <Input disabled />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input disabled />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input disabled />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Link to={appRoutes.updateProfile}>
              <FontAwesomeIcon className="mr-2" icon={faTools} />
              Update Your Profile
            </Link>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Link to={appRoutes.updatePassword}>
              <FontAwesomeIcon className="mr-2" icon={faKey} />
              Change Your Password
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default MyAccount;
