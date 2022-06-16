import { Button, Form, Input, message, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageFooter from "../../components/Footer/Footer";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { RegisterForm } from "../../models/register";
import { appRoutes } from "../../routers/config";
import "./Register.css";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const Register = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const onFinish = (values: RegisterForm) => {
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
      <div className="backgroundregister">
        <div className="site-layout-background-register">
          <h2 className="d-flex justify-content-md-center mb-4">Sign Up</h2>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              className="form-item-register"
              name="firstName"
              label="First name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="form-item-register"
              name="lastName"
              label="Last name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="form-item-register"
              name="email"
              label="Email"
              rules={[{ type: "email", required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              className="form-item-register"
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              className="form-item-register"
              name="password2"
              dependencies={["password"]}
              label="Confirm Password"
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
                      new Error("Mật khẩu xác nhận không chính xác!")
                    );
                  },
                }),
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
              className="form-item-register"
            >
              <Button className="btn-register" type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <PageFooter></PageFooter>
    </Spin>
  );
};
export default Register;
