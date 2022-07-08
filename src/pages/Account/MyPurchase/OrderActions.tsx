import {
  BookOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  FileDoneOutlined,
  LoadingOutlined,
  RotateRightOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, message, Popconfirm, Steps } from "antd";
import { useEffect, useState } from "react";
import { APP_API } from "../../../httpClient/config";
import { httpClient } from "../../../httpClient/httpServices";
import { GetOrder } from "../../../models/getOrder";
interface OrderProps {
  order: GetOrder;
  loadPage: () => void;
}

function OrderAction({ order, loadPage }: OrderProps) {
  const [orderId, setOrderId] = useState(order.id);
  const onCancel = () => {
    if (orderId) {
      httpClient()
        .get(APP_API.cancelOrder.replace(":id", orderId.toString()))
        .then((res) => {
          console.log(res);
          message.success("Hủy Đơn Hàng Thành Công!");
          loadPage();
        })
        .catch((err) => {
          console.log(err);
          message.error("Hủy Đơn Hàng Thất Bại!");
        })
        .finally();
    }
  };
  const onReceived = () => {
    if (orderId) {
      httpClient()
        .get(APP_API.receivedOrder.replace(":id", orderId.toString()))
        .then((res) => {
          console.log(res);
          message.success("Đã Nhận Đơn Hàng!");
          loadPage();
        })
        .catch((err) => {
          console.log(err);
          message.error("Xác Nhận Thất Bại!");
        })
        .finally();
    }
  };

  useEffect(() => {
    setOrderId(order.id);
  }, [order.id]);
  const { Step } = Steps;
  return (
    <>
      <div className="d-flex justify-content-end">
        {order.status == "Đang giao" && (
          <>
            <Popconfirm
              title="Xác nhận đã nhận đơn hàng này"
              onConfirm={() => {
                onReceived();
              }}
              okText="Xác nhận"
              cancelText="Không"
            >
              <Button htmlType="submit" className="btn-accept ">
                <FontAwesomeIcon className="mr-2" icon={faCheck} />
                Đã Nhận
              </Button>
            </Popconfirm>
          </>
        )}

        {order.status !== "Thành công" &&
          order.status !== "Đã hủy" &&
          order.status !== "Đã nhận" &&
          order.status !== "Đang giao" && (
            <>
              <Popconfirm
                title="Hủy đơn hàng này"
                onConfirm={() => {
                  onCancel();
                }}
                okText="Hủy"
                cancelText="Không"
              >
                <Button htmlType="submit" className="btn-cancel ml-3">
                  <FontAwesomeIcon className="mr-2" icon={faBan} />
                  Huỷ Đơn
                </Button>
              </Popconfirm>
            </>
          )}
        {order.status === "Đã nhận" && (
          <>
            <Popconfirm
              title="Trả đơn hàng này"
              onConfirm={() => {
                onCancel();
              }}
              okText="Trả"
              cancelText="Không"
            >
              <Button htmlType="submit" className="btn-cancel">
                <FontAwesomeIcon className="mr-2" icon={faBan} />
                Trả Hàng
              </Button>
            </Popconfirm>
          </>
        )}
      </div>
    </>
  );
}

export default OrderAction;
