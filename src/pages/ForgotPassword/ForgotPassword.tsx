import { Button, Form, Input, message, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { ForgotPasswordForm } from "../../models/forgotPassword";
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
        message.success("Mã Xác Nhận Đã Được Gửi Tới Mail Của Bạn!");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Spin spinning={submitting}>
      <div className="backgroundlogin rounded-3">
        <div className="site-layout-background site-layout-background-signin">
          <h2 className="d-flex justify-content-md-center mb-4">
            Quên Mật Khẩu?
          </h2>

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
              rules={[{ required: true, message: "Nhập email!" }]}
            >
              <Input className="w-100" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" className="btn-login">
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default ForgotPassword;
