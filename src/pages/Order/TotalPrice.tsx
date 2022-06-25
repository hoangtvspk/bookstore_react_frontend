import { faMoneyBillWaveAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, message } from "antd";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { GetOrder } from "../../models/getOrder";
import { appRoutes } from "../../routers/config";

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
