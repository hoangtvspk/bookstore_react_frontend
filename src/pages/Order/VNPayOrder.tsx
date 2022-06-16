import {
  DeleteFilled,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { faRemoveFormat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, message, Popconfirm, Spin, Steps } from "antd";
import { resolveSoa } from "dns";
import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { CartItem } from "../../models/cartItem";
import { GetOrder } from "../../models/getOrder";
import OrderFailed from "../../image/sad-cat.jpg";
import { useDispatch } from "react-redux";
import { updateCartData } from "../../redux/slices/cartSlice";

const VNPayOrder = () => {
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const { vnp_ResponseCode } = useParams();
  const [searchParams, setParam] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderArray, setOrderArray] = useState<GetOrder[]>([]);
  const [order, setOrder] = useState({} as GetOrder);
  const { Step } = Steps;
  const navigate = useNavigate();
  const onSuccessLoading = () => {
    httpClient()
      .get(APP_API.purchase)
      .then((res) => {
        console.log(res);
        setOrder(res.data[res.data.length - 1]);
        console.log(orderArray);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      });
  };
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };
  const dispatch = useDispatch();
  useEffect(() => {
    onSuccessLoading();
    if (
      searchParams.get("vnp_ResponseCode") == "00" ||
      searchParams.get("message") == "Success"
    ) {
      setIsSuccess(true);
      console.log(searchParams.get("vnp_ResponseCode"));
      httpClient()
        .get(APP_API.orderVNpaytrue)
        .then(() => {
          message.success("Thanh toán thành công");
          onSuccessLoading();
          dispatch(updateCartData([]));
        })
        .catch(() => {
          setIsSuccess(false);

          message.error("Thanh toán thất bại");
        });
    }

    // eslint-disable-next-line
  }, [searchParams.get("vnp_ResponseCode") || searchParams.get("message")]);

  return (
    <>
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
            {order.orderItems?.length > 0 &&
              order.orderItems.map((item: CartItem) => (
                <>
                  <div className="d-flex bg-white pl-5 pb-2">
                    <img
                      className="item-image"
                      src={item.book.bookImages[0].image}
                    ></img>
                    <div className="item-name">
                      <p style={{ marginBottom: "0px" }}>
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

                    {item.book.quantity < 1 && (
                      <div className="pt-5">
                        <div className="item-totalquantity">
                          {item.book.quantity}
                        </div>
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
                      <p style={{ marginBottom: "0px" }}>{item.quantity}</p>
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
    </>
  );
};

export default VNPayOrder;
