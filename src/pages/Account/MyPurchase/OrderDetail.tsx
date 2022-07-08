import {
  CheckOutlined,
  CloseCircleOutlined,
  DeleteFilled,
  FileDoneOutlined,
  LoadingOutlined,
  RotateRightOutlined,
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
import OrderAction from "./OrderActions";
import OrderItems from "./OrderItems";
import OrderStatus from "./OrderStatus";

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
      {order && <OrderStatus order={order}></OrderStatus>}
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
          paddingTop: "20px",
          marginBottom: 0,
          color: "	#555555",
        }}
      >
        {order.orderItems?.length} sản phẩm:
      </p>

      <OrderItems order={order}></OrderItems>
      <div className="d-flex justify-content-end">
        <div>
          <p
            style={{
              fontSize: "14px",
              paddingTop: "0px",
              marginBottom: 0,
              color: "	#555555",
            }}
          >
            Phí Vận Chuyển: 0đ
          </p>
          {order.coupon?.discountPercentValue && (
            <p
              style={{
                fontSize: "14px",
                paddingTop: "0px",
                marginBottom: 0,
                color: "	#555555",
              }}
            >
              Voucher: -{order.coupon.discountPercentValue}%
            </p>
          )}
          {order.coupon?.discountValue && (
            <p
              style={{
                fontSize: "14px",
                paddingTop: "0px",
                marginBottom: 0,
                color: "	#555555",
              }}
            >
              Voucher: -{order.coupon.discountValue}đ
            </p>
          )}
        </div>
      </div>
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
      <OrderAction loadPage={loadPage} order={order}></OrderAction>
    </div>
  );
}

export default OrderDetail;
