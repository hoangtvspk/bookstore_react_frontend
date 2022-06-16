import { Book, Category } from "../../models/book";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faBookOpen,
  faMoneyBillAlt,
  faMoneyBillWaveAlt,
  faPenAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  Card,
  Rate,
  Comment,
  Collapse,
  Button,
  Divider,
  Radio,
  Space,
  RadioChangeEvent,
  message,
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
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { GetOrder } from "../../models/getOrder";

function TotalPrice() {
  const cartItemArray = useSelector((state: RootStateOrAny) => {
    return state.cartSlice.cartItems;
  });

  const navigate = useNavigate();
  const [order, setOrder] = useState({} as GetOrder);

  useEffect(() => {
    httpClient()
      .get(APP_API.order)
      .then((res) => {
        console.log(res);
        setOrder(res.data);
        console.log(order);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
        navigate(appRoutes.cart);
      });
  }, [cartItemArray.id]);

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
          <FontAwesomeIcon
            className="mr-2"
            icon={faMoneyBillWaveAlt}
            color="#FF3333"
          />
          Đơn Hàng
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
          {order.totalPrice &&
            order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
          Phí Vận Chuyển: 0₫
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
            {order.totalPrice &&
              order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            ₫
          </p>
        </div>
      </div>
    </>
  );
}

export default TotalPrice;
