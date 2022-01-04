import { Button, Form, Input, message, Spin } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageFooter from "../../components/Footer/Footer";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { UserInfo } from "../../models/auth";
import { LoginForm } from "../../models/login";
import { userLogIn } from "../../redux/slices/authSlice";
import { updateCartData } from "../../redux/slices/cartSlice";
import { appRoutes } from "../../routers/config";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onLoadUserCartItems = () => {
    httpClient()
      .post(APP_API.getCart, localStorage.getItem("noAuthCart") || [])
      .then((res) => {
        dispatch(updateCartData(res.data));
        localStorage.removeItem("noAuthCart");
      })
      .catch((err) => message.error("Cannot load cart data"));
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
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        message.error("Incorrect Email Or Password");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Spin spinning={submitting}>
      <div className="backgroundlogin">
        <div>
          <div
            className="site-layout-background site-layout-background-signin "
            // style={{ background: "red" }}
          >
            <h2 className="d-flex justify-content-md-center mb-4">Sign In</h2>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                className="input-signin form-item"
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                className="input-signin form-item"
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                className="form-item "
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Button className="btn-login " type="primary" htmlType="submit">
                  Sign In
                </Button>
              </Form.Item>
              <Form.Item
                wrapperCol={{ offset: 8, span: 16 }}
                className="form-item "
              >
                <Link
                  style={{ marginLeft: "30px" }}
                  to={appRoutes.forgotpassword}
                >
                  Forgot Your Password?
                </Link>
              </Form.Item>
              <Form.Item
                className="form-item"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <p className="continue">Or Continue With:</p>
              </Form.Item>
              <Form.Item
                className="form-item"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <a href="http://localhost:8080/oauth2/authorize/google">
                  {" "}
                  <img
                    className="img-login"
                    src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png"
                  ></img>
                </a>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <PageFooter></PageFooter>
    </Spin>
  );
};

export default Login;
