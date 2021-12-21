import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, message, Spin } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { CartItem } from "../../models/cartItem";
import { updateCartData } from "../../redux/slices/cartSlice";
import { appRoutes } from "../../routers/config";
import "./Cart.css";

const DEFAULT_PAGE_SIZE = 30;

function Cart() {
  const cartItemArray = useSelector((state: RootStateOrAny) => {
    return state.cartSlice.cartItems;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [number, setNumber] = useState(0);

  const onDeleteItem = (id: string) => {
    setSubmitting(true);
    httpClient()
      .delete(APP_API.deleteCartItem.replace(":id", id))
      .then((res) => {
        console.log(res);
        dispatch(updateCartData(res.data));
      })
      .catch((err) => message.error("Cannot delete item"))
      .finally(() => setSubmitting(false));
  };

  const onUpdateItem = (
    bookId: number,
    quantity: ChangeEvent<HTMLInputElement>,
    maxQuantity: number
  ) => {
    setSubmitting(true);
    const cartUp = new Array();
    cartUp[0] = {
      id: bookId,
      quantity: quantity.target.value,
    };
    if (parseInt(quantity.target.value) > maxQuantity) {
      message.error("Just " + maxQuantity + " Available Books");
      setSubmitting(false);
    } else if (parseInt(quantity.target.value) < 1) {
      message.error("At Least 1");
      setSubmitting(false);
    } else if (quantity.target.value == "") {
      message.error("Cannot Be Empty");
      setSubmitting(false);
    } else {
      httpClient()
        .post(APP_API.updateCartItem, cartUp)

        .then((res) => {
          console.log(res);
          dispatch(updateCartData(res.data));
        })
        .catch((err) => {
          console.log(err);
          message.error("Cannot Update Item");
        })
        .finally(() => setSubmitting(false));
    }
  };
  const onIncrease = (
    bookId: number,
    quantity: number,
    maxQuantity: number
  ) => {
    setSubmitting(true);
    const cartUp = new Array();
    cartUp[0] = {
      id: bookId,
      quantity: quantity + 1,
    };
    console.log(cartUp);
    console.log(bookId);
    console.log(quantity);
    if (quantity < maxQuantity) {
      httpClient()
        .post(APP_API.updateCartItem, cartUp)

        .then((res) => {
          console.log(res);
          dispatch(updateCartData(res.data));
        })
        .catch((err) => {
          console.log(err);
          message.error("Cannot update cart");
        })
        .finally(() => setSubmitting(false));
    } else {
      message.error("Just " + maxQuantity + " Available Books");
      setSubmitting(false);
    }
  };
  const onDecrease = (bookId: number, quantity: number) => {
    setSubmitting(true);
    const cartUp = new Array();
    cartUp[0] = {
      id: bookId,
      quantity: quantity - 1,
    };
    console.log(cartUp);
    console.log(bookId);
    console.log(quantity);
    if (quantity > 1) {
      httpClient()
        .post(APP_API.updateCartItem, cartUp)

        .then((res) => {
          console.log(res);
          dispatch(updateCartData(res.data));
        })
        .catch((err) => {
          console.log(err);
          message.error("Cannot update cart");
        })
        .finally(() => setSubmitting(false));
    } else {
      onDeleteItem(bookId.toString());
    }
  };

  return (
    <Spin spinning={submitting}>
      <div className="cartitem">
        <div className="item-image-header"></div>
        <div className="item-name"></div>
        <div className="item-totalquantity">Available</div>
        <div className="item-totalquantity">Unit Price</div>
        <div className="item-quantity">Quantity</div>
        <div className="item-totalprice">Total Price</div>
        <div className="item-delete">Action</div>
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
              <Button
                className="quantity-btn"
                onClick={() => onDecrease(cartItem.book.id, cartItem.quantity)}
              >
                <FontAwesomeIcon className="mr-2" icon={faMinus} />
              </Button>
              <Input
                onChange={(event) =>
                  onUpdateItem(cartItem.book.id, event, cartItem.book.quantity)
                }
                value={cartItem.quantity}
                style={{ width: "70px", height: "40px" }}
              ></Input>
              <Button
                className="quantity-btn"
                onClick={() =>
                  onIncrease(
                    cartItem.book.id,
                    cartItem.quantity,
                    cartItem.book.quantity
                  )
                }
              >
                <FontAwesomeIcon className="mr-2" icon={faPlus} />
              </Button>
            </div>
            <div className="item-totalprice">
              {cartItem.quantity *
                (cartItem.book.price -
                  (cartItem.book.price * cartItem.book.discount) / 100)}{" "}
              ₫
            </div>
            <div className="item-delete">
              <span onClick={() => onDeleteItem(cartItem.id.bookId.toString())}>
                Delete
              </span>
            </div>
          </div>
        ))}
      <div className="cart-footer">
        <p className="order-quantity">Tổng {cartItemArray.length} sản phẩm</p>

        <p className="order-quantity">Tổng thanh toán:</p>
        <p className="order-total">
          {cartItemArray.length > 0 &&
            cartItemArray
              .map(
                (item: CartItem) =>
                  item.quantity *
                  (item.book.price -
                    (item.book.price * item.book.discount) / 100)
              )
              .reduce((total: number, itemPrice: number) => {
                return total + itemPrice;
              })}{" "}
          ₫
        </p>

        <div className="order-btn-background">
          <Button className="order-btn">Đặt hàng</Button>
        </div>
      </div>
    </Spin>
  );
}

export default Cart;
