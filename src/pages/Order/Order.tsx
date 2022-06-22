import {
  faAddressBook,
  faDollarSign,
  faMoneyBillAlt,
  faMoneyBillWaveAlt,
  faMoneyCheck,
  faPenAlt,
  faPlus,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  Spin,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageFooter from "../../components/Footer/Footer";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { AddressOrder } from "../../models/addressOrder";
import { UserInfo } from "../../models/auth";
import { CartItem } from "../../models/cartItem";
import { GetOrder } from "../../models/getOrder";
import { OrderForm } from "../../models/order";
import { updateCartData } from "../../redux/slices/cartSlice";
import { appRoutes } from "../../routers/config";
import { updateAddressData } from "../../redux/slices/addressSlice";
import "./Order.css";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import OrderItems from "./OrderItem";
import TotalPrice from "./TotalPrice";
import MomoLogo from "../../image/momoLogo.png";
import VNPayLogo from "../../image/vnpaylogo.png";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

const DEFAULT_PAGE_SIZE = 30;

function Order() {
  const cartItemArray = useSelector((state: RootStateOrAny) => {
    return state.cartSlice.cartItems;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState({} as GetOrder);
  const [accountForm] = useForm();
  const [addressArray, setAddressArray] = useState<AddressOrder[]>([]);
  const [addressNumber, setAddressNumber] = useState(0);
  const { Option } = Select;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getMyAddress = () => {
    httpClient()
      .get(APP_API.addressOrder)
      .then((res) => {
        console.log(res);
        setAddressArray([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onAddressChange = (e: RadioChangeEvent) => {
    setAddressValue(e.target.value);
    addressArray.map((address: AddressOrder) => {
      if (address.id == e.target.value) {
        setSelectedAddress(address);
      }
    });
    console.log(addressValue);
    console.log(selectedAddress);
  };

  const userInfo = useSelector(
    (state: RootStateOrAny) => state.authSlice.userInfo as UserInfo
  );
  const address = useSelector(
    (state: RootStateOrAny) => state.addressSlice.addressItems as AddressOrder
  );
  const [addressValue, setAddressValue] = useState(address.id);
  const [selectedAddress, setSelectedAddress] = useState(address);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 1000);

    dispatch(updateAddressData(selectedAddress));
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const showAddModal = () => {
    setAddVisible(true);
  };
  const handleAddOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAddVisible(false);
    }, 1000);
  };
  const [payValue, setPayValue] = useState("tienmat");
  const onPayChange = (e: RadioChangeEvent) => {
    setPayValue(e.target.value);
  };
  const handleAddCancel = () => {
    setAddVisible(false);
  };
  useEffect(() => {
    httpClient()
      .get(APP_API.order)
      .then((res) => {
        console.log(res);
        setOrder(res.data);
        console.log(order);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
        navigate(appRoutes.cart);
      });
    httpClient()
      .get(APP_API.userInfo)
      .then((res) => {
        console.log(res);
        accountForm.setFieldsValue(res.data);
        console.log(accountForm);
      })
      .catch((err) => {
        console.log(err);
      });
    httpClient()
      .get(APP_API.addressOrder)
      .then((res) => {
        console.log(res);
        setAddressArray([...res.data]);
        addressArray.map((address: AddressOrder) => {
          if (address.id == addressValue) {
            setSelectedAddress(address);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    if (address) {
      console.log(address);
    }
    console.log(selectedAddress);
    console.log(addressValue);
    getMyAddress();
  }, [address.id]);
  const onLoadUserAddress = () => {
    httpClient()
      .get(APP_API.addressOrder)
      .then((res) => {
        console.log(res.data.length);
        const address: AddressOrder = res.data[
          res.data.length - 1
        ] as AddressOrder;
        dispatch(updateAddressData(address));
        setAddressValue(address.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onAddAddress = (values: AddressOrder) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAddVisible(false);
    }, 1000);

    setSubmitting(true);
    httpClient()
      .post(APP_API.addAddress, values)
      .then((res) => {
        message.success("Add Successfully");
        onLoadUserAddress();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setSubmitting(false));
  };

  const onFinish = (values: OrderForm) => {
    values.email = userInfo.email;
    values.lastName = "Trần Văn";
    if (address.address) {
      values.address =
        address.address +
        ", " +
        address.neighborhoodVillage +
        ", " +
        address.districtTown +
        ", " +
        address.provinceCity;
      setSubmitting(true);
      if (payValue == "tienmat") {
        httpClient()
          .post(APP_API.order, values)
          .then((res) => {
            console.log(res);
            message.success("Đặt Hàng Thành Công!");
            navigate(appRoutes.cart);
            dispatch(updateCartData([]));
          })
          .catch((err) => {
            console.log(err);
            message.error("Failed To Order");
          })
          .finally(() => setSubmitting(false));
      } else if (payValue == "momo") {
        httpClient()
          .post(APP_API.orderMomo, values)
          .then((res) => {
            console.log(res);
            window.location.replace(res.data.payUrl);
          })
          .catch((err) => {
            console.log(err);
            message.error("Failed To Order");
          })
          .finally(() => setSubmitting(false));
      } else {
        httpClient()
          .post(APP_API.orderVNpay, values)
          .then((res) => {
            console.log(res);
            window.location.replace(res.data.data);
          })
          .catch((err) => {
            console.log(err);
            message.error("Failed To Order");
          })
          .finally(() => setSubmitting(false));
      }
    } else message.error("Vui lòng chọn địa chỉ giao hàng!");
  };

  return (
    <Spin spinning={submitting}>
      <Form name="order" form={accountForm} onFinish={onFinish}>
        <div className="d-flex">
          <div className="cart-background">
            <div className="cartitem rounded-3">
              <div className="item-image-header"></div>
              <div className="item-name"></div>

              <div
                className="item-totalquantity"
                style={{ borderLeft: "lightsteelblue solid 0.3px" }}
              >
                Đơn Giá
              </div>
              <div
                className="item-quantity"
                style={{ borderLeft: "lightsteelblue solid 0.3px" }}
              >
                Số lượng
              </div>
              <div
                className="item-totalprice"
                style={{ borderLeft: "lightsteelblue solid 0.3px" }}
              >
                Thành Tiền
              </div>
            </div>
            {cartItemArray.length > 0 &&
              cartItemArray.map((cartItem: CartItem) => (
                <OrderItems cartItem={cartItem}></OrderItems>
              ))}
          </div>
          <div className="rightContent ">
            <div className="bg-white checkCountBox  rounded-3">
              <p
                style={{
                  color: "#111111",
                  fontSize: "14px",
                  fontWeight: 500,
                  marginBottom: 0,
                }}
              >
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faAddressBook}
                  color="#339900"
                />
                Thông Tin Giao Hàng
              </p>
              <Divider className="mt-3 mb-1"></Divider>
              <p
                style={{
                  color: "#555555",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: 0,
                }}
              >
                Email: {userInfo.email}
              </p>
              <p
                style={{
                  color: "#555555",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: 0,
                }}
              >
                Tên người nhận:{" "}
              </p>
              <Form.Item
                name="firstName"
                style={{ width: "95%", marginBottom: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Nhập tên người nhận hàng!",
                  },
                ]}
              >
                <Input placeholder="Tên người dùng" />
              </Form.Item>

              <p
                style={{
                  color: "#555555",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: 0,
                }}
              >
                Số điện thoại:{" "}
              </p>
              <Form.Item
                name="phoneNumber"
                style={{ width: "95%", marginBottom: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Nhập số điện thoại!",
                  },
                ]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>
              <p
                style={{
                  color: "#555555",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: 0,
                }}
              >
                Địa chỉ giao hàng:{" "}
              </p>

              <p
                style={{
                  color: "#555555",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: 0,
                }}
              >
                {address.address}, {address.neighborhoodVillage},{" "}
                {address.districtTown}, {address.provinceCity}
              </p>
              <p
                onClick={showModal}
                style={{ cursor: "pointer", color: "#0066FF" }}
              >
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faPenAlt}
                  color="#0066FF"
                />
                Thay Đổi
              </p>
            </div>
            <div className="bg-white checkCountBox  rounded-3">
              <p
                style={{
                  color: "#111111",
                  fontSize: "14px",
                  fontWeight: 500,
                  marginBottom: 0,
                }}
              >
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faAddressBook}
                  color="#FF6633"
                />
                Phương Thức Thanh Toán
              </p>
              <Divider className="mt-3 mb-1"></Divider>
              <Radio.Group key="price" onChange={onPayChange} value={payValue}>
                <Space
                  direction="vertical"
                  style={{
                    gap: "0px",
                    borderBottom: "1px solid #efefef",
                  }}
                >
                  <Radio value="tienmat" className="font-cate">
                    <p
                      style={{
                        color: "#111111",
                        fontSize: "14px",
                        fontWeight: 500,
                        marginBottom: 0,
                      }}
                    >
                      <FontAwesomeIcon
                        className="mr-2"
                        icon={faMoneyBillAlt}
                        color="#FF9900"
                      />
                      Thanh toán bằng tiền mặt
                    </p>
                  </Radio>
                  <Radio value="vnpay" className="font-cate">
                    <p
                      style={{
                        color: "#111111",
                        fontSize: "14px",
                        fontWeight: 500,
                        marginBottom: 0,
                      }}
                    >
                      {/* <FontAwesomeIcon
                        className="mr-2"
                        icon={faPaypal}
                        color="#FF3333"
                      /> */}
                      <img src={VNPayLogo} height={17} width={17}></img>
                      &nbsp;&nbsp;VNPay
                    </p>
                  </Radio>
                  <Radio value="momo" className="font-cate">
                    <p
                      style={{
                        color: "#111111",
                        fontSize: "14px",
                        fontWeight: 500,
                        marginBottom: 0,
                      }}
                    >
                      <img src={MomoLogo} height={17} width={17}></img>
                      &nbsp;&nbsp;Momo
                    </p>
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
            <TotalPrice></TotalPrice>
            <div className="order-btn-background">
              <Button
                className="order-btn"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                htmlType="submit"
              >
                Đặt Hàng
              </Button>
            </div>
          </div>
        </div>
        <Modal
          visible={visible}
          title="Chọn Địa Chỉ Giao Hàng"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <div className="d-flex justify-content-between">
              <p
                onClick={showAddModal}
                style={{
                  cursor: "pointer",
                  color: "#0066FF",
                  marginLeft: 10,
                  alignSelf: "end",
                }}
              >
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faPlus}
                  color="#0066FF"
                />
                Địa Chỉ Mới
              </p>
              ,
              <div style={{ marginLeft: "40%" }}>
                <Button key="back" onClick={handleCancel}>
                  Hủy
                </Button>
                ,
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={handleOk}
                >
                  Lưu
                </Button>
              </div>
              ,
            </div>,
          ]}
        >
          <Radio.Group
            key="price"
            onChange={onAddressChange}
            value={addressValue}
          >
            <Space
              direction="vertical"
              style={{
                gap: "0px",
                borderBottom: "1px solid #efefef",
              }}
            >
              {addressArray.length > 0 &&
                addressArray.map((myAddress: AddressOrder) => (
                  <Radio value={myAddress.id} className="font-cate">
                    <p
                      style={{
                        color: "#111111",
                        fontSize: "14px",
                        fontWeight: 500,
                        marginBottom: 0,
                      }}
                    >
                      {myAddress.address}, {myAddress.neighborhoodVillage},{" "}
                      {myAddress.districtTown}, {myAddress.provinceCity}
                    </p>
                  </Radio>
                ))}
            </Space>
          </Radio.Group>
        </Modal>
        <Modal
          visible={addVisible}
          title="Thêm Địa Chỉ Mới"
          onOk={handleAddOk}
          onCancel={handleAddCancel}
          footer={null}
        >
          <Form name="nest-messages" onFinish={onAddAddress}>
            <p
              style={{
                color: "#555555",
                fontSize: "14px",
                fontWeight: 400,
                marginBottom: 0,
              }}
            >
              Tỉnh/Thành Phố:{" "}
            </p>
            <Form.Item
              name="provinceCity"
              style={{ width: "100%", marginBottom: 0 }}
              rules={[
                {
                  required: true,
                  message: "Nhập Tỉnh/Thành Phố!",
                },
              ]}
            >
              <Input placeholder="Tỉnh/Thành Phố" />
            </Form.Item>
            <p
              style={{
                color: "#555555",
                fontSize: "14px",
                fontWeight: 400,
                marginBottom: 0,
              }}
            >
              Quận/Huyện/Thành Phố:{" "}
            </p>
            <Form.Item
              name="districtTown"
              style={{ width: "100%", marginBottom: 0 }}
              rules={[
                {
                  required: true,
                  message: "Nhập Quận/Huyện/Thành Phố!",
                },
              ]}
            >
              <Input placeholder="Quận/Huyện/Thành Phố" />
            </Form.Item>
            <p
              style={{
                color: "#555555",
                fontSize: "14px",
                fontWeight: 400,
                marginBottom: 0,
              }}
            >
              Xã/Phường:{" "}
            </p>
            <Form.Item
              name="neighborhoodVillage"
              style={{ width: "100%", marginBottom: 0 }}
              rules={[
                {
                  required: true,
                  message: "Nhập Xã/Phường!",
                },
              ]}
            >
              <Input placeholder="Xã/Phường" />
            </Form.Item>
            <p
              style={{
                color: "#555555",
                fontSize: "14px",
                fontWeight: 400,
                marginBottom: 0,
              }}
            >
              Địa Chỉ:{" "}
            </p>
            <Form.Item
              name="address"
              style={{ width: "100%", marginBottom: 0 }}
              rules={[
                {
                  required: true,
                  message: "Nhập Địa Chỉ!",
                },
              ]}
            >
              <Input placeholder="Tên người dùng" />
            </Form.Item>
            <div className="d-flex mt-3 d-flex justify-content-end">
              <Form.Item>
                <Button type="primary" loading={loading} htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>{" "}
      </Form>
    </Spin>
  );
}

export default Order;
