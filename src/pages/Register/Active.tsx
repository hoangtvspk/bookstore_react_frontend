import { Button, Form, Input, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageFooter from "../../components/Footer/Footer";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { ActiveForm } from "../../models/activationCode";
import { appRoutes } from "../../routers/config";
import "./Active.css";

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

const Active = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const onFinish = (values: ActiveForm) => {
    console.log(values);
    setSubmitting(true);
    httpClient()
      .get(APP_API.active2 + "/" + values.code)
      .then((res) => {
        console.log(res);
        navigate(appRoutes.login);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Spin spinning={submitting}>
      <div className="backgroundactive">
        <div className="site-layout-background site-layout-background-signin">
          <h2 className="d-flex justify-content-md-center mb-4">
            Kích Hoạt Tài Khoản
          </h2>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <div style={{ marginLeft: "120px" }}>
              Mã Kích Hoạt Đã Được Gửi Đến Email Của Bạn, Kiểm Tra Ngay!
            </div>
            <Form.Item
              name="code"
              label="Nhập mã kích hoạt"
              rules={[{ required: true, message: "Nhập mã kích hoạt" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button className="btn-active" type="primary" htmlType="submit">
                kích hoạt
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <PageFooter></PageFooter>
    </Spin>
  );
};
export default Active;
