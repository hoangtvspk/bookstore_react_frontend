import { Button, Form, Input, message, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import PageTitle from "../../../components/Layout/PageTitle";
import { UserInfo } from "../../../models/auth";
import { httpClient } from "../../../httpClient/httpServices";
import { APP_API } from "../../../httpClient/config";
import { appRoutes } from "../../../routers/config";
import { LoginForm } from "../../../models/login";
import { Link, useNavigate } from "react-router-dom";
import "./Address.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { updateUserInfo, userLogIn } from "../../../redux/slices/authSlice";
import { resolveSrv } from "dns";
import { AddressOrder } from "../../../models/addressOrder";
import { updateAddressData } from "../../../redux/slices/addressSlice";

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
                <u
                  className="action-item"
                  onClick={() => {
                    onDelete(address.id.toString());
                  }}
                >
                  Delete
                </u>
              </div>
            </div>
          ))}
      </div>
    </Spin>
  );
};

export default Address;
