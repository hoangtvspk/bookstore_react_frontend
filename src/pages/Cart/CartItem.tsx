import { Book, Category } from "../../models/book";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  Card,
  Rate,
  Comment,
  Collapse,
  Button,
  message,
  Input,
} from "antd";
import Meta from "antd/lib/card/Meta";
import { httpClient } from "../../httpClient/httpServices";
import { APP_API } from "../../httpClient/config";
import { updateKeySearch } from "../../redux/slices/keySearchSlice";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../routers/config";
import { Review } from "../../models/reviews";
import { ReviewRep } from "../../models/reviewRep";
import TextArea from "antd/lib/input/TextArea";
import { loadBookDetail } from "../../redux/slices/bookDetailSlice";
import { CartItem } from "../../models/cartItem";
import { updateCartData } from "../../redux/slices/cartSlice";
interface CommentBoxProps {
  cartItem: CartItem;
}

function CartItems({ cartItem }: CommentBoxProps) {
  const dispatch = useDispatch();
  const book: Book = useSelector(
    (state: RootStateOrAny) => state.bookDetailSlice.value as Book
  );
  const [messageComment, setMassageComment] = useState("");
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };

  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [number, setNumber] = useState(0);
  const emptyPrice = 0;

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
  useEffect(() => {}, [cartItem.id]);

  return (
    <>
      <div className="cartitem rounded-3">
        <img
          className="item-image"
          src={cartItem.book.bookImages[0].image}
        ></img>
        <div className="item-name">
          <p style={{ marginBottom: "0px" }}>{cartItem.book.nameBook}</p>
          <p
            style={{
              fontSize: "12px",
              paddingTop: "0px",
              marginBottom: 0,
            }}
          >
            Thể loại: {cartItem.book.category.nameCategory}
          </p>
          <p
            style={{
              fontSize: "12px",
              paddingTop: "0px",
              marginBottom: 0,
            }}
          >
            Tác giả: {cartItem.book.author}
          </p>
          <p style={{ fontSize: "12px", paddingTop: "0px" }}>
            Còn: {cartItem.book.quantity}
          </p>
        </div>

        {cartItem.book.quantity < 1 && (
          <div className="pt-5">
            <div className="item-totalquantity">{cartItem.book.quantity}</div>
            <div
              className="item-totalquantity"
              style={{ fontSize: "12px", color: "red" }}
            >
              You must remove this book to continue!
            </div>
          </div>
        )}
        <div className="item-totalquantity">
          <p style={{ marginBottom: "0px" }}>
            {stringPrice(
              cartItem.book.price -
                (cartItem.book.price * cartItem.book.discount) / 100
            )}{" "}
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
                {stringPrice(cartItem.book.price)} ₫
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
            style={{ width: "40px", height: "30px" }}
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
          {stringPrice(
            cartItem.quantity *
              (cartItem.book.price -
                (cartItem.book.price * cartItem.book.discount) / 100)
          )}{" "}
          ₫
        </div>
        <div className="item-delete">
          <span onClick={() => onDeleteItem(cartItem.id.bookId.toString())}>
            <FontAwesomeIcon className="mr-2" icon={faTrash} color="#CCCCCC" />
          </span>
        </div>
      </div>
    </>
  );
}

export default CartItems;
