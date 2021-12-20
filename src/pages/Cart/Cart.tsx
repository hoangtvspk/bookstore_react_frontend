import {
  Button,
  Card,
  Input,
  Pagination,
  Radio,
  RadioChangeEvent,
  Space,
} from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import { httpClient } from "../../httpClient/httpServices";
import { Book } from "../../models/book";
import "./Cart.css";
import { appRoutes } from "../../routers/config";
import { Link, useNavigate } from "react-router-dom";
import { APP_API, HTTP_CONFIG } from "../../httpClient/config";
import { CartItem } from "../../models/cartItem";

const DEFAULT_PAGE_SIZE = 30;

function Cart() {
  const [cartItemArray, setCartItemArray] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const addTotalPrice = (price: number) => {
    setTotalPrice(totalPrice + price);
  };

  useEffect(() => {
    localStorage.setItem("breadcrumb", "List");
    httpClient()
      .post(APP_API.getCart, localStorage.getItem("cart"))
      .then((res) => {
        setCartItemArray([...res.data]);
        console.log(cartItemArray);
        console.log(res);
      });
  }, []);

  return (
    <>
      <div className="cartitem">
        <div className="item-image-header"></div>
        <div className="item-name"></div>
        <div className="item-totalquantity">Còn Lại</div>
        <div className="item-totalquantity">Đơn Giá</div>
        <div className="item-quantity">Số Lượng</div>
        <div className="item-totalprice">Tổng giá</div>
        <div className="item-delete">Thao tác</div>
      </div>
      {cartItemArray.length > 0 &&
        cartItemArray.map((cartItem: CartItem) => (
          <div className="cartitem">
            <img
              className="item-image"
              src={cartItem.book.bookImages[0].image}
            ></img>
            <div className="item-name">
              <p style={{ marginBottom: "0px" }}>{cartItem.book.nameBook}</p>
              <p style={{ fontSize: "14px", paddingTop: "0px" }}>
                Thể loại: {cartItem.book.category.nameCategory}
              </p>
              <p style={{ fontSize: "14px", paddingTop: "0px" }}>
                Tác giả: {cartItem.book.author}
              </p>
            </div>
            <div className="item-totalquantity">{cartItem.book.quantity}</div>
            <div className="item-totalquantity">{cartItem.book.price} ₫</div>
            <div className="item-quantity">{cartItem.quantity}</div>
            <div className="item-totalprice">
              {cartItem.quantity * cartItem.book.price}
            </div>
            <div className="item-delete">delete</div>
          </div>
        ))}
      {/* {cartItemArray.length > 0 &&
        cartItemArray.map((cartItem: CartItem) => setTotalPrice(1))} */}
      <div className="cart-footer">
        <p className="order-quantity">Tổng {cartItemArray.length} sản phẩm</p>

        <p className="order-quantity">Tổng thanh toán: {totalPrice}</p>
        <p>{}</p>

        <div className="order-btn-background">
          <Button className="order-btn">Đặt hàng</Button>
        </div>
      </div>
    </>
  );
}

export default Cart;
