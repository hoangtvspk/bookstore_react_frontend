import { faBook, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message, Spin, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../../httpClient/config";
import { httpClient } from "../../../httpClient/httpServices";
import NothingImg from "../../../image/bubbleNothing.jpg";
import { GetOrder } from "../../../models/getOrder";
import { appRoutes } from "../../../routers/config";
import "./MyPurchase.css";
import OrderList from "./OrderList";

function MyPurchase() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [orderArray, setOrderArray] = useState<GetOrder[]>([]);
  const [confirmOrderArray, setConfirmOrderArray] = useState<GetOrder[]>([]);
  const [prepareOrderArray, setPrepareOrderArray] = useState<GetOrder[]>([]);
  const [shippingOrderArray, setShippingOrderArray] = useState<GetOrder[]>([]);
  const [receivedOrderArray, setReceivedOrderArray] = useState<GetOrder[]>([]);
  const [successfulOrderArray, setSuccessfulOrderArray] = useState<GetOrder[]>(
    []
  );
  const [canceledOrderArray, setCanceledOrderArray] = useState<GetOrder[]>([]);
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };

  const onLoading = () => {
    httpClient()
      .get(APP_API.purchase)
      .then((res) => {
        console.log(res);
        setOrderArray(res.data);
        res.data.map((order: GetOrder) => {
          switch (order.status) {
            case "Chờ duyệt":
              setConfirmOrderArray((state) => [...state, order]);
              break;
            case "Đang chuẩn bị":
              setPrepareOrderArray((state) => [...state, order]);
              break;
            case "Đang giao":
              setShippingOrderArray((state) => [...state, order]);
              break;
            case "Đã nhận":
              setReceivedOrderArray((state) => [...state, order]);
              break;
            case "Thành công":
              setSuccessfulOrderArray((state) => [...state, order]);
              break;
            case "Đã hủy":
              setCanceledOrderArray((state) => [...state, order]);
              break;
          }
        });
        console.log(orderArray);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
        navigate(appRoutes.cart);
      });
  };
  const { TabPane } = Tabs;
  useEffect(() => {
    onLoading();
  }, []);

  return (
    <Spin spinning={submitting}>
      <Tabs
        defaultActiveKey="1"
        className=" rounded-3"
        tabBarStyle={{
          backgroundColor: "white",
          paddingBottom: "10px",
          borderRadius: "3px",
          marginBottom: 6,
        }}
      >
        <TabPane tab="Tất Cả" key="1">
          <OrderList orderArray={orderArray} />
        </TabPane>
        <TabPane tab="&nbsp;&nbsp;&nbsp;Chờ Xác Nhận&nbsp;&nbsp;&nbsp;" key="2">
          <OrderList orderArray={confirmOrderArray} />
        </TabPane>
        <TabPane tab="&nbsp;&nbsp;&nbsp;Đợi Lấy Hàng&nbsp;&nbsp;&nbsp;" key="3">
          <OrderList orderArray={prepareOrderArray} />
        </TabPane>
        <TabPane
          tab="&nbsp;&nbsp;&nbsp;&nbsp;Đang Giao&nbsp;&nbsp;&nbsp;&nbsp;"
          key="4"
        >
          <OrderList orderArray={shippingOrderArray} />
        </TabPane>
        <TabPane
          tab="&nbsp;&nbsp;&nbsp;&nbsp;Đã Nhận&nbsp;&nbsp;&nbsp;&nbsp;"
          key="5"
        >
          <OrderList orderArray={receivedOrderArray} />
        </TabPane>
        <TabPane
          tab="&nbsp;&nbsp;&nbsp;&nbsp;Hoàn Thành&nbsp;&nbsp;&nbsp;&nbsp;"
          key="6"
        >
          <OrderList orderArray={successfulOrderArray} />
        </TabPane>
        <TabPane tab="Đã Hủy" key="7">
          <OrderList orderArray={canceledOrderArray} />
        </TabPane>
      </Tabs>
    </Spin>
  );
}

export default MyPurchase;
