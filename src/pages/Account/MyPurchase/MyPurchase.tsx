import {
  faDollarSign,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, message, Select, Spin } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../../httpClient/config";
import { httpClient } from "../../../httpClient/httpServices";
import { CartItem } from "../../../models/cartItem";
import { updateCartData } from "../../../redux/slices/cartSlice";
import { appRoutes } from "../../../routers/config";
import "./MyPurchase.css";
import { OrderForm } from "../../../models/order";
import { useForm } from "antd/lib/form/Form";
import { GetOrder } from "../../../models/getOrder";
import { AddressOrder } from "../../../models/addressOrder";
import { Collapse } from "antd";

const { Panel } = Collapse;

const DEFAULT_PAGE_SIZE = 30;

function MyPurchase() {
  const cartItemArray = useSelector((state: RootStateOrAny) => {
    return state.cartSlice.cartItems;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [orderArray, setOrderArray] = useState<GetOrder[]>([]);
  const [accountForm] = useForm();
  const [addressArray, setAddressArray] = useState<AddressOrder[]>([]);
  const [addressNumber, setAddressNumber] = useState(0);
  const { Option } = Select;

  useEffect(() => {
    httpClient()
      .get(APP_API.purchase)
      .then((res) => {
        console.log(res);
        setOrderArray(res.data);
        console.log(orderArray);
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
      {orderArray.length > 0 &&
        orderArray.map((purchaseItem: GetOrder) => (
          <div className="order-array-item">
            <div className="purchase-item-title">
              <p className="purchase-item-text-title">Order ID</p>
              <p className="purchase-item-text-title">Receiver</p>
              <p className="purchase-item-text-title">Address</p>
              <p className="purchase-item-text-title">Order Date</p>
              <p className="purchase-item-text-title">Status</p>
            </div>
            <div className="purchase-item">
              <p className="purchase-item-text">{purchaseItem.id}</p>
              <p className="purchase-item-text">
                {purchaseItem.firstName + " " + purchaseItem.lastName}
              </p>
              <p className="purchase-item-text">{purchaseItem.address}</p>
              <p className="purchase-item-text">null</p>
              <p className="purchase-item-text">{purchaseItem.status}</p>
            </div>

            <Collapse ghost>
              <Panel
                header={
                  <u className="order-collapse-header">
                    Show The Ordered Products
                  </u>
                }
                key="1"
                className="order-collapse"
              >
                <div className="purchase-order-item">
                  <div className="order-item-image-header"></div>
                  <div className="order-item-name"></div>
                  <div className="order-item-totalquantity">Available</div>
                  <div className="order-item-totalquantity">Unit Price</div>
                  <div className="order-item-quantity">Quantity</div>
                  <div className="order-item-totalprice">Total Price</div>
                </div>
                {purchaseItem.orderItems.length > 0 &&
                  purchaseItem.orderItems.map((orderItem: CartItem) => (
                    <div className="purchase-order-item">
                      <img
                        className="order-item-image"
                        src={orderItem.book.bookImages[0].image}
                      ></img>
                      <div className="order-item-name">
                        <p style={{ marginBottom: "0px" }}>
                          {orderItem.book.nameBook}
                        </p>
                        <p style={{ fontSize: "14px", paddingTop: "0px" }}>
                          Thể loại: {orderItem.book.category.nameCategory}
                        </p>
                        <p style={{ fontSize: "14px", paddingTop: "0px" }}>
                          Tác giả: {orderItem.book.author}
                        </p>
                      </div>
                      <div className="order-item-totalquantity">
                        {orderItem.book.quantity}
                      </div>
                      <div className="order-item-totalquantity">
                        <p style={{ marginBottom: "0px" }}>
                          {orderItem.book.price -
                            (orderItem.book.price * orderItem.book.discount) /
                              100}{" "}
                          ₫
                        </p>
                        {orderItem.book.discount > 0 && (
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
                              {orderItem.book.price} ₫
                            </p>
                            <p className="discountt">
                              -{orderItem.book.discount}%
                            </p>
                          </>
                        )}
                      </div>

                      <div className="order-item-quantity">
                        {orderItem.quantity}
                      </div>
                      <div className="order-item-totalprice">
                        {orderItem.quantity *
                          (orderItem.book.price -
                            (orderItem.book.price * orderItem.book.discount) /
                              100)}{" "}
                        ₫
                      </div>
                    </div>
                  ))}
              </Panel>
            </Collapse>
            <div className="purchase-order-total-layout">
              <div className="purchase-order-total-layout-border">
                <p className="purchase-order-total-title">
                  <FontAwesomeIcon
                    className="mr-2"
                    style={{ color: "red" }}
                    icon={faDollarSign}
                  />
                  Order Total:{" "}
                </p>
                <p className="purchase-order-total">
                  {purchaseItem.totalPrice} ₫
                </p>
              </div>
            </div>
          </div>
        ))}
    </Spin>
  );
}

export default MyPurchase;
