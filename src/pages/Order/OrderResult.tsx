import {
  DeleteFilled,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, message, Spin, Steps } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import OrderFailed from "../../image/sad-cat.jpg";
import { CartItem } from "../../models/cartItem";
import { GetOrder } from "../../models/getOrder";
import OrderItems from "./OrderItem";

const OrderResult = () => {
  const [searchParams, setParam] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);

  const [order, setOrder] = useState({} as GetOrder);
  const { Step } = Steps;

  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    setSubmitting(true);
    httpClient()
      .get(APP_API.purchase)
      .then((res) => {
        setIsSuccess(true);
        console.log(res);
        if (res.data.length > 0) setOrder(res.data[res.data.length - 1]);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      })
      .finally(() => setSubmitting(false));

    // eslint-disable-next-line
  }, [searchParams.get("vnp_ResponseCode") || searchParams.get("message")]);

  return (
    <Spin spinning={submitting}>
      {isSuccess && (
        <>
          <div className="bg-white p-4 orderDetail-background-height">
            <h2>Đặt Hàng Thành Công</h2>
            {order.status == "Đặt hàng" && (
              <Steps>
                <Step
                  status="process"
                  title="Đặt Hàng"
                  icon={<UserOutlined />}
                />
                <Step status="wait" title="Giao Hàng" icon={<UserOutlined />} />
                <Step
                  status="wait"
                  title="Nhận Hàng"
                  icon={<SolutionOutlined />}
                />
                <Step
                  status="wait"
                  title="Thanh Toán"
                  icon={<SmileOutlined />}
                />
              </Steps>
            )}
            {order.status == "Đã hủy" && (
              <Steps>
                <Step
                  status="finish"
                  title="Đặt Hàng"
                  icon={<UserOutlined />}
                />
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
            <div className="purchase-order-info">
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
                  order.totalPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                ₫
              </p>
            </div>
            <Divider></Divider>
            <div className="cartitem rounded-3">
              <div className="item-image-header"></div>
              <div className="item-name"></div>

              <div
                className="item-totalquantity"
                style={{ borderLeft: "lightsteelblue solid 0.3px" }}
              >
                Đơn Giá
              </div>
              <div
                className="item-quantity"
                style={{ borderLeft: "lightsteelblue solid 0.3px" }}
              >
                Số lượng
              </div>
              <div
                className="item-totalprice"
                style={{ borderLeft: "lightsteelblue solid 0.3px" }}
              >
                Thành Tiền
              </div>
            </div>
            {order.orderItems?.length > 0 &&
              order.orderItems.map((item: CartItem) => (
                <>
                  <OrderItems cartItem={item}></OrderItems>
                </>
              ))}
          </div>
        </>
      )}
      {!isSuccess && (
        <>
          <div className="bg-white p-4 orderDetail-background-height d-flex justify-content-center align-items-center">
            <div>
              <img src={OrderFailed} height="400" width="600" />
              <h2 className="d-flex justify-content-center">
                Đặt Hàng Thất Bại
              </h2>
            </div>
          </div>
        </>
      )}
    </Spin>
  );
};

export default OrderResult;
