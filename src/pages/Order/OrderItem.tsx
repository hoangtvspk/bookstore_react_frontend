import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../models/cartItem";
import { appRoutes } from "../../routers/config";
interface CommentBoxProps {
  cartItem: CartItem;
}

function OrderItems({ cartItem }: CommentBoxProps) {
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };
  const navigate = useNavigate();
  useEffect(() => {}, [cartItem.id]);

  return (
    <>
      <div className="cartitem rounded-3">
        <img
          className="item-image"
          src={cartItem.book.bookImages[0].image}
          onClick={() => {
            navigate(
              appRoutes.bookDetail.replace(":id", cartItem.book.id.toString())
            );
          }}
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
          <p style={{ marginBottom: "0px" }}>{cartItem.quantity}</p>
        </div>
        <div className="item-totalprice">
          {stringPrice(
            cartItem.quantity *
              (cartItem.book.price -
                (cartItem.book.price * cartItem.book.discount) / 100)
          )}{" "}
          ₫
        </div>
      </div>
    </>
  );
}

export default OrderItems;
