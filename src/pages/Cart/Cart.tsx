import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Input, message, Spin } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageFooter from "../../components/Footer/Footer";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import emptyCart from "../../image/emptycart.png";
import { CartItem } from "../../models/cartItem";
import { updateCartData } from "../../redux/slices/cartSlice";
import { appRoutes } from "../../routers/config";
import "./Cart.css";
import CartItems from "./CartItem";
import TotalPrice from "./TotalPrice";
import Voucher from "./Voucher";

const DEFAULT_PAGE_SIZE = 30;

function Cart() {
  const isLoggedIn = useSelector((state: RootStateOrAny) => {
    return state.authSlice.isAuth;
  });

  const [localCartItemArray, setLocalCartItemArray] = useState<CartItem[]>([]);

  const cartItemArray = useSelector((state: RootStateOrAny) => {
    return state.cartSlice.cartItems;
  });

  const localCart = localStorage.getItem("cart");
  const localNoAuthCart = localStorage.getItem("noAuthCart");

  const isEmpty = () => {
    if (localCart == "[]") return true;
    return false;
  };

  useEffect(() => {
    const cartLocalItemArray = JSON.parse(localNoAuthCart || "[]");
    console.log(localCart);

    httpClient()
      .post(APP_API.makeCart, cartLocalItemArray)
      .then((res) => {
        console.log(res);
        setLocalCartItemArray([...res.data]);
        console.log(localCartItemArray);
      });
  }, []);

  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  return (
    <Spin spinning={submitting}>
      {isLoggedIn && (
        <div>
          {isEmpty() && (
            <div className="empty-cart bg-white pt-5 pb-5">
              <img src={emptyCart} height="400" width="600" />
            </div>
          )}
          {!isEmpty() && (
            <div className="d-flex">
              <div className="cart-background">
                <div className="cartitem rounded-3">
                  <div className="item-image-header"></div>
                  <div className="item-name"></div>

                  <div className="item-totalquantity">Đơn Giá</div>
                  <div className="item-quantity">Số lượng</div>
                  <div className="item-totalprice">Thành Tiền</div>
                </div>
                {cartItemArray.length > 0 &&
                  cartItemArray.map((cartItem: CartItem) => (
                    <CartItems cartItem={cartItem}></CartItems>
                  ))}
              </div>
              <div className="rightContent ">
                <Voucher></Voucher>
                <TotalPrice></TotalPrice>
                <div className="order-btn-background">
                  <Button
                    className="order-btn"
                    onClick={() => {
                      navigate(appRoutes.order);

                      window.scrollTo(0, 0);
                    }}
                  >
                    Mua Hàng
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Spin>
  );
}

export default Cart;
