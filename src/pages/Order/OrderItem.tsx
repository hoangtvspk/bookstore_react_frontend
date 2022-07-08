import { useEffect, useState } from "react";
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
  const [itemSale, setItemSale] = useState(0);
  const [itemSalePrice, setItemSalePrice] = useState(0);
  const [itemTotalPrice, setItemTotalPrice] = useState(0);
  const navigate = useNavigate();
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
    }
  }, [cartItem.id]);

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
          <p style={{ marginBottom: "0px" }}>{cartItem.quantity}</p>
        </div>
        <div className="item-totalprice">{stringPrice(itemTotalPrice)} ₫</div>
      </div>
    </>
  );
}

export default OrderItems;
