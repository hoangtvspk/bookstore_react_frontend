import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, message } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { CartItem } from "../../models/cartItem";
import { updateCartData } from "../../redux/slices/cartSlice";
import { appRoutes } from "../../routers/config";
interface CommentBoxProps {
  cartItem: CartItem;
}

function CartItems({ cartItem }: CommentBoxProps) {
  const dispatch = useDispatch();

  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };
  const [itemSale, setItemSale] = useState(0);
  const [itemSalePrice, setItemSalePrice] = useState(0);
  const [itemTotalPrice, setItemTotalPrice] = useState(0);
  const onDeleteItem = (id: string) => {
    httpClient()
      .delete(APP_API.deleteCartItem.replace(":id", id))
      .then((res) => {
        console.log(res);
        dispatch(updateCartData(res.data));
      })
      .catch((err) => message.error("Không thể xóa"))
      .finally();
  };

  const onUpdateItem = (
    bookId: number,
    quantity: ChangeEvent<HTMLInputElement>,
    maxQuantity: number
  ) => {
    const cartUp = new Array();
    cartUp[0] = {
      id: bookId,
      quantity: quantity.target.value,
    };
    if (parseInt(quantity.target.value) > maxQuantity) {
      message.error("Chỉ còn " + maxQuantity + " Cuốn");
    } else if (parseInt(quantity.target.value) < 1) {
      message.error("Ít nhất 1");
    } else if (quantity.target.value == "") {
      message.error("Không để trống");
    } else {
      httpClient()
        .post(APP_API.updateCartItem, cartUp)

        .then((res) => {
          console.log(res);
          dispatch(updateCartData(res.data));
        })
        .catch((err) => {
          console.log(err);
          message.error("Không Thể Thay Đổi");
        })
        .finally();
    }
  };
  const navigate = useNavigate();
  const onIncrease = (
    bookId: number,
    quantity: number,
    maxQuantity: number
  ) => {
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
          message.error("Không Thể Thay Đổi");
        })
        .finally();
    } else {
      message.error("Chỉ còn " + maxQuantity + " cuốn");
    }
  };
  const onDecrease = (bookId: number, quantity: number) => {
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
          message.error("Không Thể Thay Đổi");
        })
        .finally();
    } else {
      onDeleteItem(bookId.toString());
    }
  };
  useEffect(() => {
    if (cartItem.book.bookForEvents.length > 0) {
      if (cartItem.book.bookForEvents[0].discountPercentValue) {
        setItemSalePrice(
          cartItem.book.price -
            (cartItem.book.price *
              cartItem.book.bookForEvents[0].discountPercentValue) /
              100
        );
        setItemSale(cartItem.book.bookForEvents[0].discountPercentValue);
        setItemTotalPrice(
          (cartItem.book.price -
            (cartItem.book.price *
              cartItem.book.bookForEvents[0].discountPercentValue) /
              100) *
            cartItem.quantity
        );
      }
      if (cartItem.book.bookForEvents[0].discountValue) {
        setItemSalePrice(
          cartItem.book.price - cartItem.book.bookForEvents[0].discountValue
        );
        setItemSale(cartItem.book.bookForEvents[0].discountValue);
        setItemTotalPrice(
          (cartItem.book.price - cartItem.book.bookForEvents[0].discountValue) *
            cartItem.quantity
        );
      }
    } else {
      if (cartItem.book.discount > 0) {
        setItemTotalPrice(
          (cartItem.book.price -
            (cartItem.book.price * cartItem.book.discount) / 100) *
            cartItem.quantity
        );
      } else {
        setItemTotalPrice(cartItem.book.price * cartItem.quantity);
      }
    }
  }, [cartItem.id]);

  return (
    <>
      <div className="cartitem rounded-3">
        <img
          onClick={() => {
            navigate(
              appRoutes.bookDetail.replace(":id", cartItem.book.id.toString())
            );
          }}
          alt="itemImage"
          className="item-image"
          src={cartItem.book.bookImages[0].image}
          style={{ cursor: "pointer" }}
        ></img>
        <div className="item-name">
          <p
            onClick={() => {
              navigate(
                appRoutes.bookDetail.replace(":id", cartItem.book.id.toString())
              );
            }}
            style={{ marginBottom: "0px", cursor: "pointer" }}
          >
            {cartItem.book.nameBook}
          </p>
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
          {cartItem.book.quantity < 1 && (
            <p style={{ fontSize: "12px", color: "red" }}>Sản phẩm đã hết!</p>
          )}
        </div>

        <div className="item-totalquantity">
          {cartItem.book.bookForEvents?.length < 1 && (
            <>
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
            </>
          )}
          {cartItem.book.bookForEvents?.length > 0 && (
            <>
              <p style={{ marginBottom: "0px" }}>
                {stringPrice(itemSalePrice)} ₫
              </p>
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
              <p className="discountt"> -{itemSale}%</p>
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
        <div className="item-totalprice">{stringPrice(itemTotalPrice)} ₫</div>
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
