import { Button, Form, Input, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/Layout/PageTitle";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { ActiveForm } from "../../modals/activationCode";

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
      <PageTitle>Activate your account</PageTitle>
      <div className="site-layout-background d-flex align-items-center justify-content-center ">
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <div>Your activation code was sent to your email, check it now!</div>
          <Form.Item
            name="code"
            label="Enter your activation code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Active
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};
export default Active;
