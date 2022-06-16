import { faBook, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, message, Popconfirm, Select, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageFooter from "../../../components/Footer/Footer";
import { APP_API } from "../../../httpClient/config";
import { httpClient } from "../../../httpClient/httpServices";
import { AddressOrder } from "../../../models/addressOrder";
import { CartItem } from "../../../models/cartItem";
import { GetOrder } from "../../../models/getOrder";
import { OrderForm } from "../../../models/order";
import { updateCartData } from "../../../redux/slices/cartSlice";
import { appRoutes } from "../../../routers/config";
import "./MyPurchase.css";

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

  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };

  const onLoading = () => {
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
  };

  useEffect(() => {
    onLoading();
  }, []);

  const onCancel = (id: number) => {
    setSubmitting(true);
    if (id) {
      httpClient()
        .get(APP_API.cancelOrder.replace(":id", id.toString()))
        .then((res) => {
          console.log(res);
          message.success("Cancel successfully");
          onLoading();
        })
        .catch((err) => {
          console.log(err);
          message.error("Can't delete");
        })
        .finally(() => setSubmitting(false));
    }
  };

  return (
    <Spin spinning={submitting}>
      {orderArray.length > 0 &&
        orderArray.slice(0).map((purchaseItem: GetOrder) => (
          <div
            className="order-array-item"
            onClick={() => {
              navigate(
                appRoutes.orderDetail.replace(":id", purchaseItem.id.toString())
              );
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="purchase-order-info">
              <p
                style={{
                  fontSize: "14px",
                  paddingTop: "0px",
                  marginBottom: 0,
                  color: "	#555555",
                }}
              >
                {purchaseItem.date}
              </p>
              <p
                style={{
                  fontSize: "16px",
                  paddingTop: "0px",
                  marginBottom: 0,
                  color: "	#990000",
                }}
              >
                {purchaseItem.status}
              </p>
            </div>
            <div className="purchase-item-title">
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
            <div className="purchase-item">
              <img
                className="item-image"
                src={purchaseItem.orderItems[0].book.bookImages[0].image}
              ></img>
              <div className="item-name">
                <p style={{ marginBottom: "0px" }}>
                  {purchaseItem.orderItems[0].book.nameBook}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    paddingTop: "0px",
                    marginBottom: 0,
                  }}
                >
                  Thể loại:{" "}
                  {purchaseItem.orderItems[0].book.category.nameCategory}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    paddingTop: "0px",
                    marginBottom: 0,
                  }}
                >
                  Tác giả: {purchaseItem.orderItems[0].book.author}
                </p>
                <p style={{ fontSize: "12px", paddingTop: "0px" }}>
                  Còn: {purchaseItem.orderItems[0].book.quantity}
                </p>
              </div>

              <div className="item-totalquantity">
                <p style={{ marginBottom: "0px" }}>
                  {stringPrice(
                    purchaseItem.orderItems[0].book.price -
                      (purchaseItem.orderItems[0].book.price *
                        purchaseItem.orderItems[0].book.discount) /
                        100
                  )}{" "}
                  ₫
                </p>
                {purchaseItem.orderItems[0].book.discount > 0 && (
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
                      {stringPrice(purchaseItem.orderItems[0].book.price)} ₫
                    </p>
                    <p className="discountt">
                      -{purchaseItem.orderItems[0].book.discount}%
                    </p>
                  </>
                )}
              </div>

              <div className="item-quantity">
                <p style={{ marginBottom: "0px" }}>
                  {purchaseItem.orderItems[0].quantity}
                </p>
              </div>
              <div className="item-totalprice">
                {stringPrice(
                  purchaseItem.orderItems[0].quantity *
                    (purchaseItem.orderItems[0].book.price -
                      (purchaseItem.orderItems[0].book.price *
                        purchaseItem.orderItems[0].book.discount) /
                        100)
                )}{" "}
                ₫
              </div>
              {/* {purchaseItem.status == "Đặt hàng" && (
                  <>
                    <Popconfirm
                      title="Are you sure to cancel this order?"
                      onConfirm={() => {
                        onCancel(purchaseItem.id);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <u className="purchase-item-text action-item">Cancel</u>
                    </Popconfirm>
                  </>
                )}
                {purchaseItem.status == "Đã hủy" && (
                  <>
                    <u className="purchase-item-text action-item-cancelled">
                      Cancel
                    </u>
                  </>
                )} */}
            </div>

            {/* <Collapse ghost>
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
                            {stringPrice(
                              orderItem.book.price -
                                (orderItem.book.price *
                                  orderItem.book.discount) /
                                  100
                            )}{" "}
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
                                {stringPrice(orderItem.book.price)} ₫
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
                          {stringPrice(
                            orderItem.quantity *
                              (orderItem.book.price -
                                (orderItem.book.price *
                                  orderItem.book.discount) /
                                  100)
                          )}{" "}
                          ₫
                        </div>
                      </div>
                    ))}
                </Panel>
              </Collapse> */}
            <p
              style={{
                fontSize: "13px",
                paddingTop: "0px",
                marginBottom: 0,
              }}
            >
              <FontAwesomeIcon
                className="mr-1"
                icon={faBook}
                color="#3366FF"
              ></FontAwesomeIcon>
              {purchaseItem.orderItems.length} sản phẩm
            </p>
            <div className="purchase-order-total-layout">
              <div className="purchase-order-total-layout-border">
                <p className="purchase-order-total-title">
                  <FontAwesomeIcon
                    className="mr-2"
                    style={{ color: "red" }}
                    icon={faDollarSign}
                  />
                  Tổng Đơn Hàng:{" "}
                </p>
                <p className="purchase-order-total">
                  {stringPrice(purchaseItem.totalPrice)} ₫
                </p>
              </div>
            </div>
          </div>
        ))}
    </Spin>
  );
}

export default MyPurchase;
