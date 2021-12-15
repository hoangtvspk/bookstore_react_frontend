import { Button, Form, Input, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/Layout/PageTitle";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { ForgotPasswordForm } from "../../modals/forgotPassword";
import "../../routers/config";
import { appRoutes } from "../../routers/config";

const ForgotPassword = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const onFinish = (values: ForgotPasswordForm) => {
    setSubmitting(true);
    httpClient()
      .post(APP_API.forgotPassword, values)
      .then((res) => {
        console.log(res);
        navigate(appRoutes.home);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Spin spinning={submitting}>
      <div>
        <PageTitle>Forgot Password?</PageTitle>
        <div
          className="site-layout-background d-flex align-items-center justify-content-center"
          // style={{ background: "red" }}
        >
          <div></div>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className=""
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input className="w-100" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default ForgotPassword;
