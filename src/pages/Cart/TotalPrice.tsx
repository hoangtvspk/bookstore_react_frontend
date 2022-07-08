import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider } from "antd";
import { useEffect } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { CartItem } from "../../models/cartItem";

function TotalPrice() {
  const cartItemArray = useSelector((state: RootStateOrAny) => {
    return state.cartSlice.cartItems;
  });

  useEffect(() => {}, [cartItemArray.id]);

  return (
    <>
      <div className="bg-white checkCountBox  rounded-3">
        <p
          style={{
            color: "#111111",
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: 0,
          }}
        >
          <FontAwesomeIcon className="mr-2" icon={faPenAlt} color="#009900" />
          Tạm Tính
        </p>
        <Divider className="mt-3 mb-1"></Divider>
        <p
          style={{
            color: "#555555",
            fontSize: "14px",
            fontWeight: 400,
            marginBottom: 0,
          }}
        >
          {cartItemArray.length} Sản Phẩm
        </p>
        <p
          style={{
            color: "#555555",
            fontSize: "14px",
            fontWeight: 400,
            marginBottom: 0,
          }}
        >
          Tạm Tính:{" "}
          {/* {cartItemArray.length > 0 &&
            cartItemArray
              .map(
                (item: CartItem) =>
                  item.quantity *
                  (item.book.price -
                    (item.book.price * item.book.discount) / 100)
              )
              .reduce((total: number, itemPrice: number) => {
                return total + itemPrice;
              })
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
          {cartItemArray.length > 0 && (
            <>
              {cartItemArray[0].total
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </>
          )}
          ₫
        </p>
        <p
          style={{
            color: "#555555",
            fontSize: "14px",
            fontWeight: 400,
            marginBottom: 0,
          }}
        >
          Mã Giảm Giá: -0₫
        </p>

        <Divider className="mt-1 mb-1"></Divider>
        <div className="d-flex  align-items-center">
          <p
            style={{
              color: "#555555",
              fontSize: "14px",
              fontWeight: 400,
              marginBottom: 0,
            }}
          >
            Tổng đơn hàng:&nbsp;
          </p>

          <p className="order-total">
            {" "}
            {cartItemArray.length > 0 && (
              <>
                {cartItemArray[0].total
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </>
            )}
            ₫
          </p>
        </div>
      </div>
    </>
  );
}

export default TotalPrice;
