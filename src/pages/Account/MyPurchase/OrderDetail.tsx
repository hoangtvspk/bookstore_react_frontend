import {
  DeleteFilled,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { faRemoveFormat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, message, Popconfirm, Steps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APP_API } from "../../../httpClient/config";
import { httpClient } from "../../../httpClient/httpServices";
import { CartItem } from "../../../models/cartItem";
import { GetOrder } from "../../../models/getOrder";
import { appRoutes } from "../../../routers/config";

function OrderDetail() {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState({} as GetOrder);
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };

  const { Step } = Steps;
  const onCancel = (id: number) => {
    if (id) {
      httpClient()
        .get(APP_API.cancelOrder.replace(":id", id.toString()))
        .then((res) => {
          console.log(res);
          message.success("Cancel successfully");
          loadPage();
        })
        .catch((err) => {
          console.log(err);
          message.error("Can't delete");
        })
        .finally();
    }
  };
  const loadPage = () => {
    console.log(orderId);
    if (orderId) {
      httpClient()
        .get(APP_API.orderDetail.replace(":id", orderId))
        .then((res) => {
          console.log(res);
          setOrder(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    loadPage();
  }, [orderId]);

  return (
    <div className="bg-white p-4" style={{ minHeight: "calc(100vh - 200px)" }}>
      {order.status === "Đặt hàng" && (
        <Steps>
          <Step status="finish" title="Đặt Hàng" icon={<UserOutlined />} />
          <Step status="process" title="Giao Hàng" icon={<UserOutlined />} />
          <Step status="wait" title="Nhận Hàng" icon={<SolutionOutlined />} />
          <Step status="wait" title="Thanh Toán" icon={<SmileOutlined />} />
        </Steps>
      )}
      {order.status === "Đã hủy" && (
        <Steps>
          <Step status="finish" title="Đặt Hàng" icon={<UserOutlined />} />
          <Step status="finish" title="Hủy Đơn" icon={<DeleteFilled />} />
        </Steps>
      )}

      <p
        style={{
          fontSize: "14px",
          paddingTop: "20px",
          marginBottom: 0,
          color: "	#555555",
        }}
      >
        Mã đơn hàng: bks2h2k96{order.id}
      </p>
      <p
        style={{
          fontSize: "14px",
          paddingTop: "0px",
          marginBottom: 0,
          color: "	#555555",
        }}
      >
        Người nhận: {order.firstName}
      </p>
      <p
        style={{
          fontSize: "14px",
          paddingTop: "0px",
          marginBottom: 0,
          color: "	#555555",
        }}
      >
        Ngày đặt: {order.date}
      </p>
      <p
        style={{
          fontSize: "14px",
          paddingTop: "0px",
          marginBottom: 0,
          color: "	#555555",
        }}
      >
        Địa Chỉ: {order.address}
      </p>
      <p
        style={{
          fontSize: "14px",
          paddingTop: "0px",
          marginBottom: 0,
          color: "	#555555",
        }}
      >
        {order.orderItems?.length} sản phẩm:
      </p>

      {order.orderItems?.length > 0 &&
        order.orderItems.map((item: CartItem) => (
          <>
            <div className="d-flex bg-white pl-5 pb-2">
              <img
                className="item-image"
                src={item.book.bookImages[0].image}
                onClick={() => {
                  navigate(
                    appRoutes.bookDetail.replace(":id", item.book.id.toString())
                  );
                }}
                style={{ cursor: "pointer" }}
              ></img>
              <div className="item-name">
                <p
                  onClick={() => {
                    navigate(
                      appRoutes.bookDetail.replace(
                        ":id",
                        item.book.id.toString()
                      )
                    );
                  }}
                  style={{ marginBottom: "0px", cursor: "pointer" }}
                >
                  {item.book.nameBook}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    paddingTop: "0px",
                    marginBottom: 0,
                  }}
                >
                  Thể loại: {item.book.category.nameCategory}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    paddingTop: "0px",
                    marginBottom: 0,
                  }}
                >
                  Tác giả: {item.book.author}
                </p>
                <p style={{ fontSize: "12px", paddingTop: "0px" }}>
                  Còn: {item.book.quantity}
                </p>
              </div>

              <div className="item-totalquantity">
                <p style={{ marginBottom: "0px" }}>
                  {stringPrice(
                    item.book.price -
                      (item.book.price * item.book.discount) / 100
                  )}{" "}
                  ₫
                </p>
                {item.book.discount > 0 && (
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
                      {stringPrice(item.book.price)} ₫
                    </p>
                    <p className="discountt">-{item.book.discount}%</p>
                  </>
                )}
              </div>

              <div className="item-quantity">
                <p style={{ marginBottom: "0px" }}>x{item.quantity}</p>
              </div>
              <div className="item-totalprice">
                {stringPrice(
                  item.quantity *
                    (item.book.price -
                      (item.book.price * item.book.discount) / 100)
                )}{" "}
                ₫
              </div>
            </div>
          </>
        ))}
      <div className="purchase-order-info-detail">
        <p
          style={{
            fontSize: "20px",
            paddingTop: "0px",
            marginBottom: 0,
            color: "	#990000",
          }}
        >
          Tổng đơn hàng:{" "}
          {order.totalPrice &&
            order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          ₫
        </p>
      </div>
      {order.status === "Đặt hàng" && (
        <>
          <Popconfirm
            title="Hủy đơn hàng này"
            onConfirm={() => {
              onCancel(order.id);
            }}
            okText="Hủy"
            cancelText="Không"
          >
            <div className="d-flex justify-content-end">
              <Button htmlType="submit" className="btn-submit">
                <FontAwesomeIcon className="mr-2" icon={faRemoveFormat} />
                Huỷ Đơn
              </Button>
            </div>
          </Popconfirm>
        </>
      )}
    </div>
  );
}

export default OrderDetail;
