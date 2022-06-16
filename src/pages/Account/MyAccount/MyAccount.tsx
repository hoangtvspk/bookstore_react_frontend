import {
  faArrowLeft,
  faEdit,
  faPenAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Image, Input, message, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ChangeEvent, useEffect, useState } from "react";
import { ImageListType, ImageType } from "react-images-uploading";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageFooter from "../../../components/Footer/Footer";
import PageTitle from "../../../components/Layout/PageTitle";
import { APP_API } from "../../../httpClient/config";
import { httpClient } from "../../../httpClient/httpServices";
import { UserInfo } from "../../../models/auth";
import { UpdateProfileForm } from "../../../models/updateProfile";
import { updateUserInfo } from "../../../redux/slices/authSlice";
import { appRoutes } from "../../../routers/config";
import "./MyAccount.css";
import ImageUploading from "react-images-uploading";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */

const MyAccount = () => {
  const userInfo = useSelector(
    (state: RootStateOrAny) => state.authSlice.userInfo as UserInfo
  );
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [currentedImage, setCurrentedImage] = useState("");
  const [image, setImage] = useState("");
  const firstNameInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFirstName(event.target.value);
  };
  const lastNameInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLastName(event.target.value);
  };
  const phoneNumberInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setPhoneNumber(event.target.value);
  };
  const [images, setImages] = useState([] as ImageListType);
  const [nullImages, setNullImages] = useState({} as ImageType);
  const [isImageChange, setIsImageChange] = useState(false);
  const maxNumber = 10;
  const onChange = (
    image: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(image, addUpdateIndex);
    setIsImageChange(true);
    setImages(image);
    // setFile1(imageList[0].file);
  };

  const [accountForm] = useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const onFinish = (values: UpdateProfileForm) => {
    const formData: FormData = new FormData();
    if (isImageChange) {
      formData.append(
        "user",
        new Blob(
          [
            JSON.stringify({
              firstName,
              lastName,
              phoneNumber,
              email,
            }),
          ],
          { type: "application/json" }
        )
      );
      formData.append("file", images[0].file as string | Blob);
    } else {
      formData.append(
        "user",
        new Blob(
          [
            JSON.stringify({
              firstName,
              lastName,
              phoneNumber,
              email,
              currentedImage,
            }),
          ],
          { type: "application/json" }
        )
      );
      // for (let i = 0; i < images.length; i++) {
      //   console.log(images[i]);
      //   formData.append("file", images[i].file as string | Blob);
      // }
      formData.append("file", "");
    }
    setSubmitting(true);
    httpClient()
      .put(APP_API.editProfile, formData, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const userInfo: UserInfo = res.data as UserInfo;
        message.success("Update Successfully");
        dispatch(
          updateUserInfo({
            ...userInfo,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            phoneNumber: res.data.phoneNumber,
            image: res.data.image,
          })
        );
        navigate(appRoutes.myAccount);
      })
      .catch((err) => {
        console.error(err);
        message.error(err.response.data);
      })
      .finally(() => setSubmitting(false));
  };

  useEffect(() => {
    if (userInfo.image) console.log(userInfo.image);
    httpClient()
      .get(APP_API.userInfo)
      .then((res) => {
        console.log(res);
        accountForm.setFieldsValue(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setPhoneNumber(res.data.phoneNumber);
        setEmail(res.data.email);
        setImage(res.data.image);
        console.log(res.data.image);
        setImages([
          {
            dataURL: res.data.image,
          },
        ]);
        setCurrentedImage(res.data.image);
      });
  }, []);

  return (
    <Spin spinning={submitting}>
      <div className="profile-background">
        <PageTitle>Thông Tin Cá Nhân</PageTitle>
        <div className="site-layout-background d-flex align-items-start justify-content-center ">
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            acceptType={["jpg", "gif", "png"]}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div
                className="upload__image-wrapper"
                style={{ marginLeft: "80px" }}
              >
                &nbsp;
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <Image
                      src={image.dataURL}
                      alt=""
                      width={100}
                      height={100}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div className="image-item__btn-wrapper">
                      {/* <Button onClick={() => onImageUpdate(index)}>
                        Chọn Ảnh Khác
                      </Button> */}
                      <div>
                        <span
                          onClick={() => onImageUpdate(index)}
                          style={{
                            fontSize: 14,

                            color: "	#3333FF",
                            cursor: "pointer",
                          }}
                        >
                          <FontAwesomeIcon className="mr-2" icon={faEdit} />
                          Chọn Hình Khác
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
          <Form
            {...layout}
            name="nest-messages"
            form={accountForm}
            onFinish={onFinish}
            style={{ paddingLeft: "70px" }}
          >
            <div>
              <span
                style={{
                  fontSize: 16,

                  color: "#555555",
                }}
              >
                Họ:
              </span>
            </div>
            <Form.Item
              className="input-signin form-item pt-2 pb-2 "
              name="lastName"
              rules={[{ required: true, message: "Nhập Họ!" }]}
            >
              <Input
                onChange={(e) => {
                  firstNameInputChange(e);
                }}
              />
            </Form.Item>
            <div>
              <span
                style={{
                  fontSize: 16,

                  color: "#555555",
                }}
              >
                Tên:
              </span>
            </div>
            <Form.Item
              className="input-signin form-item pt-2 pb-2 "
              name="firstName"
              rules={[{ required: true, message: "Nhập Tên!" }]}
            >
              <Input
                onChange={(e) => {
                  lastNameInputChange(e);
                }}
              />
            </Form.Item>

            <div>
              <span
                style={{
                  fontSize: 16,

                  color: "#555555",
                }}
              >
                Email:
              </span>
            </div>
            <Form.Item
              className="input-signin form-item pt-2 pb-2 "
              name="email"
            >
              <Input disabled />
            </Form.Item>
            <div>
              <span
                style={{
                  fontSize: 16,

                  color: "#555555",
                }}
              >
                Số Điện Thoại:
              </span>
            </div>
            <Form.Item
              className="input-signin form-item pt-2 pb-2 "
              name="phoneNumber"
              rules={[{ required: true, message: "Nhập Số Điện Thoại!" }]}
            >
              <Input
                onChange={(e) => {
                  phoneNumberInputChange(e);
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu Thay Đổi
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default MyAccount;
