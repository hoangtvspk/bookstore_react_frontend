import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, message, Popconfirm, Spin } from "antd";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageFooter from "../../../components/Footer/Footer";
import PageTitle from "../../../components/Layout/PageTitle";
import { APP_API } from "../../../httpClient/config";
import { httpClient } from "../../../httpClient/httpServices";
import { AddressOrder } from "../../../models/addressOrder";
import { UserInfo } from "../../../models/auth";
import { updateAddressData } from "../../../redux/slices/addressSlice";
import { appRoutes } from "../../../routers/config";
import "./Address.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */

const Address = () => {
  const userInfo = useSelector(
    (state: RootStateOrAny) => state.authSlice.userInfo as UserInfo
  );

  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [addressArray, setAddressArray] = useState<AddressOrder[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    httpClient()
      .get(APP_API.addressOrder)
      .then((res) => {
        console.log(res);
        setAddressArray([...res.data]);
        dispatch(updateAddressData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const reload = () => {
    httpClient()
      .get(APP_API.addressOrder)
      .then((res) => {
        console.log(res);
        setAddressArray([...res.data]);
        dispatch(updateAddressData(res.data));
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
        dispatch(updateAddressData(res.data));
        reload();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setSubmitting(false));
  };

  const onEdit = (id: string) => {
    navigate(appRoutes.editAddress.replace(":id", id));
  };

  return (
    <Spin spinning={submitting}>
      <div className="address-background">
        <PageTitle>Address Manage</PageTitle>
        <div className="btn-add-background">
          <Button
            className="btn-add"
            onClick={() => {
              navigate(appRoutes.addAddress);
            }}
          >
            <FontAwesomeIcon className="mr-3" icon={faPlus}></FontAwesomeIcon>
            Add New Address
          </Button>
        </div>
        {addressArray.length > 0 &&
          addressArray.map((address: AddressOrder, index) => (
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
                  Edit
                </u>
                <p className="action-item-slice"> | </p>
                <Popconfirm
                  title="Are you sure to delete this address?"
                  onConfirm={() => {
                    onDelete(address.id.toString());
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <u className="action-item">Delete</u>
                </Popconfirm>
              </div>
            </div>
          ))}
      </div>
      <PageFooter></PageFooter>
    </Spin>
  );
};

export default Address;
