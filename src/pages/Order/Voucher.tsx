import { faSeedling, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Input, message, Modal, Radio, Space } from "antd";
import { RadioChangeEvent, RadioChangeEventTarget } from "antd/lib/radio";
import { SelectValue } from "antd/lib/select";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { VoucherModel } from "../../models/voucher";
import { appRoutes } from "../../routers/config";

interface VoucherProps {
  getVoucherValue: (voucherCode: string) => void;
}

function Voucher({ getVoucherValue }: VoucherProps) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [voucherList, setVoucherList] = useState<VoucherModel[]>([]);
  const [voucher, setVoucher] = useState({} as VoucherModel);
  const [voucherValue, setVoucherValue] = useState("");
  const [vcherCode, setVcherCode] = useState("");
  const onVcherInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVcherCode(e.target.value);
  };

  const onCheckValue = (voucherCode: string) => {
    httpClient()
      .get(APP_API.checkVoucher.replace(":id", voucherCode))
      .then((res) => {
        getVoucher(voucherCode);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      });
  };
  const getVoucherList = () => {
    httpClient()
      .get(APP_API.getVoucherList)
      .then((res) => {
        console.log(res);
        setVoucherList([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getVoucher = (couponCode: string) => {
    httpClient()
      .get(APP_API.getVoucher.replace(":id", couponCode))
      .then((res) => {
        setVoucherValue(couponCode);
        getVoucherValue(couponCode);
        handleCancel();
        console.log(res);
        setVoucher(res.data);
        if (res.data.discountPercentValue) {
          setVoucherInfo(
            couponCode + " - Giảm " + res.data.discountPercentValue + "%"
          );
          message.success(
            "Đã Áp Dụng Mã " +
              couponCode +
              " - Giảm " +
              res.data.discountPercentValue +
              "%"
          );
        }
        if (res.data.discountValue) {
          setVoucherInfo(
            couponCode +
              " - Giảm " +
              stringPrice(res.data.discountValue) +
              "VNĐ"
          );
          message.success(
            "Đã Áp Dụng Mã " +
              couponCode +
              " - Giảm " +
              res.data.discountValue +
              "VNĐ"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showModal = () => {
    setVisible(true);
  };
  const dispatch = useDispatch();
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 1000);

    // dispatch(updateAddressData(selectedAddress));
  };
  const handleNotNow = () => {
    setVoucherValue("");
    setVoucherInfo("Chưa áp dụng");
    handleCancel();
    getVoucherValue("");
  };
  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    getVoucherList();
  }, []);
  const [voucherInfo, setVoucherInfo] = useState("Chưa áp dụng");
  const onClick = (couponCode: string) => {
    onCheckValue(couponCode);
  };
  const onChange = (e: RadioChangeEvent) => {
    setVoucherValue(e.target.value);
  };
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };
  const formatDate = (date: string) => {
    return date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
  };
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
            icon={faTicketAlt}
            color="	#3366FF"
          />
          Mã Giảm Giá
        </p>
        <Divider className="mt-3 mb-1"></Divider>
        {voucherInfo}
        <div
          onClick={() => {
            showModal();
          }}
          style={{ color: "	#3366FF", cursor: "pointer" }}
        >
          <FontAwesomeIcon className="mr-2" icon={faSeedling} color="	#3366FF" />
          Chọn hoặc nhập mã giảm giá
        </div>
      </div>
      <Modal
        visible={visible}
        title="Chọn Mã Giảm Giá"
        onOk={handleOk}
        onCancel={handleCancel}
        width={550}
        footer={[
          <div className="d-flex justify-content-end">
            <div style={{ marginLeft: "40%" }}>
              <Button key="back" onClick={handleNotNow}>
                Để Sau
              </Button>
              <Button key="back" onClick={handleCancel}>
                Hủy
              </Button>
            </div>
            ,
          </div>,
        ]}
      >
        <div style={{ height: "400px", overflow: "auto" }}>
          <div className="d-flex mb-2" style={{ width: "470px" }}>
            <Input
              name="vCode"
              placeholder="Nhập mã giảm giá..."
              onChange={(e) => onVcherInputChange(e)}
            ></Input>
            <Button onClick={() => onCheckValue(vcherCode)}>Áp Dụng</Button>
          </div>
          <Radio.Group key="price" onChange={onChange} value={voucherValue}>
            <Space
              direction="vertical"
              style={{
                gap: "0px",
                borderBottom: "1px solid #efefef",
              }}
            >
              {voucherList.length > 0 &&
                voucherList.map((voucher: VoucherModel) => (
                  <div
                    className="font-cate"
                    onClick={() => onClick(voucher.couponCode)}
                  >
                    <div
                      className="d-flex rounded-3 pl-2 justify-content-between"
                      style={{
                        border: "1px #FF6600 solid",
                        width: "470px",
                        height: "100px",
                        backgroundColor: "rgb(244,164,96,0.1)",
                      }}
                    >
                      <div className="d-flex">
                        <div
                          className="mr-3 d-flex justify-content-center align-items-center"
                          style={{
                            width: "100px",
                            border: "1px #FF0000 solid",
                            backgroundColor: "rgb(238, 121, 66,0.6)",
                          }}
                        >
                          <p
                            style={{
                              color: "white",
                              fontSize: "17px",
                              fontWeight: 500,
                              marginBottom: 0,
                            }}
                          >
                            {voucher.couponCode}
                          </p>
                        </div>
                        <div>
                          <div
                            className="d-flex pt-1"
                            style={{
                              color: "#666666",
                              fontSize: "17px",
                              fontWeight: 500,

                              fontFamily: "Helvetica",
                            }}
                          >
                            Giảm&nbsp;
                            {voucher.discountPercentValue && (
                              <p style={{ marginBottom: 0 }}>
                                {voucher.discountPercentValue}%
                              </p>
                            )}
                            {voucher.discountValue && (
                              <p style={{ marginBottom: 0 }}>
                                {stringPrice(voucher.discountValue)}VNĐ
                              </p>
                            )}
                          </div>
                          <div className="d-flex mb-3" style={{}}>
                            <p
                              className="mb-0  pr-1"
                              style={{ border: "#FF6A6A 0.5px solid" }}
                            >
                              Đơn tối thiểu{" "}
                              {stringPrice(voucher.minimumOrderValue)}
                              VNĐ
                            </p>
                          </div>
                          <div className="d-flex ">
                            <p>
                              Từ {formatDate(voucher.dayStart)} đến{" "}
                              {formatDate(voucher.dayEnd)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Radio value={voucher.couponCode}></Radio>
                      </div>
                    </div>
                  </div>
                ))}
            </Space>
          </Radio.Group>
        </div>
      </Modal>
    </>
  );
}

export default Voucher;
