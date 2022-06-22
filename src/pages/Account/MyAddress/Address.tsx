import { faPen, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message, Modal, Popconfirm, Spin } from "antd";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/Layout/PageTitle";
import { APP_API } from "../../../httpClient/config";
import { httpClient } from "../../../httpClient/httpServices";
import NothingImg from "../../../image/bubbleNothing.jpg";
import { AddressOrder } from "../../../models/addressOrder";
import { UserInfo } from "../../../models/auth";
import {
  updateAddressData,
  updateAddressListData,
} from "../../../redux/slices/addressSlice";
import { appRoutes } from "../../../routers/config";
import AddAddress from "./AddAddress";
import "./Address.css";
import EditAddress from "./EditAddress";

const Address = () => {
  const addressList = useSelector(
    (state: RootStateOrAny) =>
      state.addressSlice.addressesList as AddressOrder[]
  );
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(addressList[0]?.id.toString());
  const dispatch = useDispatch();
  const onLoadUserAddress = () => {
    httpClient()
      .get(APP_API.addressOrder)
      .then((res) => {
        console.log(res.data.length);
        const address: AddressOrder = res.data[
          res.data.length - 1
        ] as AddressOrder;
        dispatch(updateAddressData(address || {}));
        dispatch(updateAddressListData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    httpClient()
      .get(APP_API.addressOrder)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [loading, setLoading] = useState(false);
  const reload = () => {
    httpClient()
      .get(APP_API.addressOrder)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = (id: string) => {
    setSubmitting(true);
    httpClient()
      .delete(APP_API.deleteAddress.replace(":id", id))
      .then((res) => {
        console.log(res);
        message.success("Delete Successfully");
        navigate(appRoutes.address);
        onLoadUserAddress();
        reload();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setSubmitting(false));
  };
  const handleAddOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAddVisible(false);
    }, 1000);
  };

  const handleAddCancel = () => {
    setAddVisible(false);
  };
  const handleEditOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEditVisible(false);
    }, 1000);
  };

  const handleEditCancel = () => {
    setEditVisible(false);
  };
  const onEdit = (id: string) => {
    setSelectedId(id);
    //navigate(appRoutes.editAddress.replace(":id", id));
    setEditVisible(true);
  };
  const showAddModal = () => {
    setAddVisible(true);
  };
  return (
    <Spin spinning={submitting}>
      <div className="address-background">
        <PageTitle>Địa Chỉ Giao Hàng</PageTitle>
        <div className="btn-add-background">
          <p
            onClick={showAddModal}
            style={{
              cursor: "pointer",
              color: "#0066FF",
              marginLeft: 10,
              alignSelf: "end",
            }}
          >
            <FontAwesomeIcon className="mr-2" icon={faPlus} color="#0066FF" />
            Địa Chỉ Mới
          </p>
        </div>
        <Modal
          visible={addVisible}
          title="Thêm Địa Chỉ Mới"
          onOk={handleAddOk}
          onCancel={handleAddCancel}
          footer={null}
        >
          <AddAddress></AddAddress>{" "}
        </Modal>
        <Modal
          visible={editVisible}
          title="Chỉnh Sửa Địa Chỉ"
          onOk={handleEditOk}
          onCancel={handleEditOk}
          footer={null}
        >
          <EditAddress id={selectedId}></EditAddress>{" "}
        </Modal>
        {addressList?.length > 0 &&
          addressList?.map((address: AddressOrder, index) => (
            <div className="address-item-background">
              {address.address +
                ", " +
                address.neighborhoodVillage +
                ", " +
                address.districtTown +
                ", " +
                address.provinceCity}
              <div className="action-background">
                <u
                  className="action-item"
                  onClick={() => {
                    onEdit(address.id.toString());
                  }}
                >
                  <FontAwesomeIcon
                    className="mr-1"
                    icon={faPen}
                    color="	#0099FF"
                  ></FontAwesomeIcon>
                </u>
                <p className="action-item-slice"> | </p>
                <Popconfirm
                  title="Xóa Địa Chỉ Này?"
                  onConfirm={() => {
                    onDelete(address.id.toString());
                  }}
                  okText="Xóa"
                  cancelText="Hủy"
                >
                  <u className="action-item">
                    <FontAwesomeIcon
                      className="mr-3"
                      icon={faTrashAlt}
                      color="#DDDDDD"
                    ></FontAwesomeIcon>
                  </u>
                </Popconfirm>
              </div>
            </div>
          ))}
        {addressList?.length == 0 && (
          <div className="bg-white p-4 orderDetail-background-height d-flex justify-content-center align-items-center">
            <div>
              <img alt="nothing" src={NothingImg} height="300" width="500" />
              <h2 className="d-flex justify-content-center">
                Chưa có địa chỉ!
              </h2>
            </div>
          </div>
        )}
      </div>
    </Spin>
  );
};

export default Address;
