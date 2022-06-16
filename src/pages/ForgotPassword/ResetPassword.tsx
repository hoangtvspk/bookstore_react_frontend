import { Button, Form, Input, message, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageFooter from "../../components/Footer/Footer";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { ResetPasswordForm } from "../../models/resetPassword";
import "../../routers/config";
import { appRoutes } from "../../routers/config";

const ResetPassword = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { code } = useParams();

  const [resetForm] = useForm();
  const onFinish = (values: ResetPasswordForm) => {
    console.log(values);
    setSubmitting(true);
    httpClient()
      .post(APP_API.resetPassword, values)
      .then((res) => {
        console.log(res);
        navigate(appRoutes.login);
        message.success("Change Password Successfully");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitting(false));
  };

  useEffect(() => {
    if (code) {
      httpClient()
        .get(APP_API.resetUserData.replace(":resetCode", code))
        .then((res) => {
          console.log(res);
          resetForm.setFieldsValue({ email: res.data.email });
        })
        .catch((err) => {
          console.error(err);
          message.error("Couldn't fetch user info");
        });
    }
    // eslint-disable-next-line
  }, [code]);

  return (
    <Spin spinning={submitting}>
      <div className="backgroundlogin">
        <div className="site-layout-background site-layout-background-signin">
          <h2 className="d-flex justify-content-md-center mb-4">
            Reset Your Password
          </h2>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className=""
            form={resetForm}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input disabled className="w-100" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input className="w-100" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="password2"
              rules={[
                { required: true, message: "Please input confirm password!" },
              ]}
            >
              <Input className="w-100" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Reset your password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default ResetPassword;
