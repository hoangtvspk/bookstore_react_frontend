import { Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import PageTitle from "../../components/Layout/PageTitle";
import { UserInfo } from "../../modals/auth";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */

const MyAccount = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };
  const userInfo = useSelector(
    (state: RootStateOrAny) => state.authSlice.userInfo as UserInfo
  );
  const [accountForm] = useForm();

  useEffect(() => {
    if (userInfo?.firstName) {
      accountForm.setFieldsValue({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
      });
    }
  }, [userInfo]);
  return (
    <>
      <PageTitle>My Account</PageTitle>
      <div className="site-layout-background d-flex align-items-center justify-content-center ">
        <Form
          {...layout}
          name="nest-messages"
          form={accountForm}
          onFinish={onFinish}
        >
          <Form.Item
            name="firstName"
            label="First name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default MyAccount;
