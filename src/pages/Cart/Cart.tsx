import { Button, Input } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { CartItem } from "../../models/cartItem";
import "./Cart.css";

const DEFAULT_PAGE_SIZE = 30;

function Cart() {
  const [cartItemArray, setCartItemArray] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const addTotalPrice = (price: number) => {
    setTotalPrice(totalPrice + price);
  };

  useEffect(() => {
    httpClient()
      .post(APP_API.getCart, localStorage.getItem("cart"))
      .then((res) => {
        setCartItemArray([...res.data]);
        console.log(cartItemArray);
        console.log(res);
      });
  }, []);

  const onDeleteItem = (id: string) => {
    console.log(id);
    const deleteFormData = new FormData();
    deleteFormData.append("idBook", id);
    httpClient()
      .delete(APP_API.deleteCartItem, {
        data: deleteFormData,
        headers: {
          Authorization: localStorage.getItem("token") || "",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res));
  };

  const onUpdateItem = (
    bookId: number,
    quantity: ChangeEvent<HTMLInputElement>
  ) => {
    const update = {
      "1": quantity,
    };
    httpClient()
      .post(APP_API.updateCartItem, JSON.stringify(update))
      .then((res) => {
        console.log(res);
      });
  };

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
            <div className="item-totalquantity">
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
            <div className="item-quantity">
              <Input
                onChange={(event) => onUpdateItem(cartItem.book.id, event)}
                defaultValue={cartItem.quantity}
                style={{ width: "70px" }}
              ></Input>
            </div>
            <div className="item-totalprice">
              {cartItem.quantity *
                (cartItem.book.price -
                  (cartItem.book.price * cartItem.book.discount) / 100)}{" "}
              ₫
            </div>
            <div className="item-delete">
              <span onClick={() => onDeleteItem(cartItem.id.bookId.toString())}>
                delete
              </span>
            </div>
          </div>
        ))}
      {/* {cartItemArray.length > 0 &&
        cartItemArray.map((cartItem: CartItem) =>
          setTotalPrice(totalPrice + cartItem.quantity * cartItem.book.price)
        )} */}
      <div className="cart-footer">
        <p className="order-quantity">Tổng {cartItemArray.length} sản phẩm</p>

        <p className="order-quantity">Tổng thanh toán:</p>
        <p className="order-total">
          {cartItemArray.length > 0 &&
            cartItemArray
              .map(
                (item) =>
                  item.quantity *
                  (item.book.price -
                    (item.book.price * item.book.discount) / 100)
              )
              .reduce((total, itemPrice) => {
                return total + itemPrice;
              })}{" "}
          ₫
        </p>

        <div className="order-btn-background">
          <Button className="order-btn">Đặt hàng</Button>
        </div>
      </div>
    </>
  );
}

export default Cart;
