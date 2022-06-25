import { Button, Form, Input, message, Spin, Tabs } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { AddressOrder } from "../../models/addressOrder";
import { UserInfo } from "../../models/auth";
import { LoginForm } from "../../models/login";
import { RegisterForm } from "../../models/register";
import {
  updateAddressData,
  updateAddressListData,
} from "../../redux/slices/addressSlice";
import { userLogIn } from "../../redux/slices/authSlice";
import { updateCartData } from "../../redux/slices/cartSlice";
import { appRoutes } from "../../routers/config";
import "./Login.css";

const Login = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { TabPane } = Tabs;
  const onLoadUserCartItems = () => {
    httpClient()
      .post(APP_API.getCart, localStorage.getItem("noAuthCart") || [])
      .then((res) => {
        dispatch(updateCartData(res.data));
        localStorage.removeItem("noAuthCart");
      })
      .catch((err) => message.error("Cannot load cart data"));
  };
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

  const onFinish = (values: LoginForm) => {
    setSubmitting(true);
    httpClient()
      .post(APP_API.login, values)
      .then((res) => {
        const userInfo: UserInfo = res.data as UserInfo;
        dispatch(userLogIn(userInfo));
        navigate(appRoutes.home);
        message.success("Log In Successfully");
        onLoadUserCartItems();
        onLoadUserAddress();
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        message.error("Incorrect Email Or Password");
      })
      .finally(() => setSubmitting(false));
  };
  const onRegisterFinish = (values: RegisterForm) => {
    console.log(values);
    setSubmitting(true);
    httpClient()
      .post(APP_API.registration, values)
      .then((res) => {
        console.log(res);
        navigate(appRoutes.active);
      })
      .catch((err) => {
        console.log(err.response);
        message.error(
          err.response.data.emailError || err.response.data.passwordError
        );
      })
      .finally(() => setSubmitting(false));
  };
  return (
    <Spin spinning={submitting}>
      <div>
        <div className="backgroundlogin">
          <div style={{ paddingLeft: "20%" }}>
            <Tabs defaultActiveKey="1" className="bg-white">
              <TabPane
                tab="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đăng Nhập&nbsp;&nbsp;&nbsp;&nbsp;"
                key="1"
              >
                <div
                  className=" site-layout-background-signin"
                  // style={{ background: "red" }}
                >
                  {/* <h2 className="d-flex justify-content-md-center mb-4">
                Đăng Nhập
              </h2> */}
                  <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: 16,

                          color: "#555555",
                        }}
                      >
                        Nhập Email:
                      </span>
                    </div>

                    <Form.Item
                      className="input-signin form-item pt-2 pb-2 "
                      name="email"
                      rules={[
                        { required: true, message: "Nhập tài khoản đăng ký!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <div>
                      <span
                        style={{
                          fontSize: 16,

                          color: "#555555",
                        }}
                      >
                        Nhập Mật Khẩu:
                      </span>
                    </div>
                    <Form.Item
                      className="input-signin form-item pt-2 "
                      name="password"
                      rules={[{ required: true, message: "Nhập mật khẩu!" }]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{ offset: 8, span: 16 }}
                      className="form-item pb-2"
                    >
                      <Link
                        style={{ marginLeft: "90px" }}
                        to={appRoutes.forgotpassword}
                      >
                        Quên Mật Khẩu?
                      </Link>
                    </Form.Item>
                    <Form.Item className="d-flex justify-content-center">
                      <Button
                        className="btn-login "
                        type="primary"
                        htmlType="submit"
                      >
                        Đăng Nhập
                      </Button>
                    </Form.Item>

                    <Form.Item className="form-item">
                      <p
                        style={{
                          paddingLeft: 115,
                          paddingBottom: 0,
                        }}
                        className="continue "
                      >
                        Hoặc Đăng Nhập Bằng:
                      </p>
                    </Form.Item>
                    <Form.Item
                      className="continue"
                      style={{
                        paddingLeft: 170,
                        paddingBottom: 0,
                        marginTop: 0,
                      }}
                    >
                      <a href="http://localhost:8080/oauth2/authorize/google">
                        {" "}
                        <img
                          alt="imglogin"
                          className="img-login "
                          src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png"
                        ></img>
                      </a>
                    </Form.Item>
                    <Form.Item style={{ paddingLeft: 160 }}>
                      <div>
                        <Link to={appRoutes.register}>Tạo tài khoản</Link>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>
              <TabPane
                tab="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đăng Ký&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                key="2"
              >
                <div
                  className="site-layout-background site-layout-background-signin "
                  // style={{ background: "red" }}
                >
                  <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onRegisterFinish}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: 16,

                          color: "#555555",
                        }}
                      >
                        Nhập Tên:
                      </span>
                    </div>
                    <Form.Item
                      className="input-signin form-item pt-2 pb-2"
                      name="firstName"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <div>
                      <span
                        style={{
                          fontSize: 16,

                          color: "#555555",
                        }}
                      >
                        Nhập Họ:
                      </span>
                    </div>
                    <Form.Item
                      className="input-signin form-item pt-2 pb-2"
                      name="lastName"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <div>
                      <span
                        style={{
                          fontSize: 16,

                          color: "#555555",
                        }}
                      >
                        Nhập Email:
                      </span>
                    </div>
                    <Form.Item
                      className="input-signin form-item pt-2 pb-2"
                      name="email"
                      rules={[{ type: "email", required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <div>
                      <span
                        style={{
                          fontSize: 16,

                          color: "#555555",
                        }}
                      >
                        Nhập Mật Khẩu:
                      </span>
                    </div>
                    <Form.Item
                      className="input-signin form-item pt-2 pb-2"
                      name="password"
                      rules={[{ required: true }]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <div>
                      <span
                        style={{
                          fontSize: 16,

                          color: "#555555",
                        }}
                      >
                        Xác Nhận Mật Khẩu:
                      </span>
                    </div>
                    <Form.Item
                      className="input-signin form-item pt-2 pb-2"
                      name="password2"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The two passwords that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item className="d-flex justify-content-center">
                      <Button
                        className="btn-login "
                        type="primary"
                        htmlType="submit"
                      >
                        Đăng Ký
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>
            </Tabs>{" "}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Login;
