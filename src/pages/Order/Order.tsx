import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, message, Select, Spin } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { CartItem } from "../../models/cartItem";
import { updateCartData } from "../../redux/slices/cartSlice";
import { appRoutes } from "../../routers/config";
import "./Order.css";
import { OrderForm } from "../../models/order";
import { useForm } from "antd/lib/form/Form";
import { GetOrder } from "../../models/getOrder";
import { AddressOrder } from "../../models/addressOrder";
import { current } from "@reduxjs/toolkit";

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onFinish = (values: OrderForm) => {
    setSubmitting(true);
    httpClient()
      .post(APP_API.order, values)
      .then((res) => {
        console.log(res);
        message.success("Order Successfully!");
        navigate(appRoutes.cart);
        dispatch(updateCartData([]));
      })
      .catch((err) => {
        console.log(err);
        message.error("All datas are required");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Spin spinning={submitting}>
      <Form name="order" form={accountForm} onFinish={onFinish}>
        <div className="order-user-info">
          <h2 style={{ color: "tomato" }}>Delivery Address</h2>

          <div className="order-user-info-form">
            <div>
              <div className="order-user-name">
                <Form.Item
                  name="firstName"
                  style={{ width: "95%" }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  style={{ paddingLeft: "10px", width: "100%" }}
                  name="lastName"
                  rules={[
                    { required: true, message: "Please input your last name!" },
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </div>

              <Form.Item name="email">
                <Input placeholder="Email" disabled />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
              <Form.Item
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <Select allowClear>
                  {addressArray.length > 0 &&
                    addressArray.map((address: AddressOrder) => (
                      <Option
                        value={
                          address.address +
                          ", " +
                          address.neighborhoodVillage +
                          ", " +
                          address.districtTown +
                          ", " +
                          address.provinceCity
                        }
                      >
                        {address.address +
                          ", " +
                          address.neighborhoodVillage +
                          ", " +
                          address.districtTown +
                          ", " +
                          address.provinceCity}
                      </Option>
                    ))}
                  <Option value="newAddress">New ...</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="order-cartitem" style={{ fontSize: "30px" }}>
          Products Ordered
        </div>
        <div className="order-cartitem">
          <div className="order-item-image-header"></div>
          <div className="order-item-name"></div>
          <div className="order-item-totalquantity">Available</div>
          <div className="order-item-totalquantity">Unit Price</div>
          <div className="order-item-quantity">Quantity</div>
          <div className="order-item-totalprice">Total Price</div>
        </div>
        {cartItemArray.length > 0 &&
          cartItemArray.map((cartItem: CartItem) => (
            <div className="order-cartitem">
              <img
                className="order-item-image"
                src={cartItem.book.bookImages[0].image}
              ></img>
              <div className="order-item-name">
                <p style={{ marginBottom: "0px" }}>{cartItem.book.nameBook}</p>
                <p style={{ fontSize: "14px", paddingTop: "0px" }}>
                  Thể loại: {cartItem.book.category.nameCategory}
                </p>
                <p style={{ fontSize: "14px", paddingTop: "0px" }}>
                  Tác giả: {cartItem.book.author}
                </p>
              </div>
              <div className="order-item-totalquantity">
                {cartItem.book.quantity}
              </div>
              <div className="order-item-totalquantity">
                <p style={{ marginBottom: "0px" }}>
                  {cartItem.book.price -
                    (cartItem.book.price * cartItem.book.discount) / 100}{" "}
                  ₫
                </p>
                {cartItem.book.discount > 0 && (
                  <>
                    <p
                      style={{
                        color: "rgb(128, 128, 137) ",
                        marginTop: "8px",
                        fontSize: "15px",
                        textDecoration: "line-through",
                        paddingLeft: "8px",
                        marginBottom: "0px",
                      }}
                    >
                      {cartItem.book.price} ₫
                    </p>
                    <p className="discountt">-{cartItem.book.discount}%</p>
                  </>
                )}
              </div>

              <div className="order-item-quantity">{cartItem.quantity}</div>
              <div className="order-item-totalprice">
                {cartItem.quantity *
                  (cartItem.book.price -
                    (cartItem.book.price * cartItem.book.discount) / 100)}{" "}
                ₫
              </div>
            </div>
          ))}

        <div className="order-cart-footer">
          <p className="order-order-quantity">
            Amount: {cartItemArray.length} Items
          </p>

          <p className="order-order-quantity">Total Payment:</p>
          <p className="order-order-total">{order.totalPrice} ₫</p>

          <div className="order-order-btn-background">
            <Button className="order-order-btn" htmlType="submit">
              Place Order
            </Button>
          </div>
        </div>
      </Form>
    </Spin>
  );
}

export default Order;
