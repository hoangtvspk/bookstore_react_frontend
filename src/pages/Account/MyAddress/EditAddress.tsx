import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../../httpClient/config";
import { httpClient } from "../../../httpClient/httpServices";
import { AddressOrder } from "../../../models/addressOrder";
import {
  updateAddressData,
  updateAddressListData,
} from "../../../redux/slices/addressSlice";
import { appRoutes } from "../../../routers/config";
import "./Address.css";

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */
interface EditAddressBoxProps {
  id: string;
}
function EditAddress({ id }: EditAddressBoxProps) {
  const dispatch = useDispatch();
  const [addressForm] = useForm();
  const navigate = useNavigate();
  const onLoadUserAddress = () => {
    httpClient()
      .get(APP_API.addressOrder)
      .then((res) => {
        console.log(res.data.length);
        const address: AddressOrder = res.data[
          res.data.length - 1
        ] as AddressOrder;
        dispatch(updateAddressData(address));
        dispatch(updateAddressListData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    httpClient()
      .get(APP_API.getAddress.replace(":id", id))
      .then((res) => {
        console.log(res);
        addressForm.setFieldsValue({
          id: id,
          provinceCity: res.data.provinceCity,
          districtTown: res.data.districtTown,
          neighborhoodVillage: res.data.neighborhoodVillage,
          address: res.data.address,
        });

        console.log(addressForm.getFieldsValue());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, addressForm]);

  const onFinish = (values: AddressOrder) => {
    values.id = parseInt(id);

    if (id) {
      httpClient()
        .put(APP_API.updateAddress.replace(":id", id), values)
        .then((res) => {
          message.success("Update Successfully");
          navigate(appRoutes.address);
          onLoadUserAddress();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally();
    }
  };

  return (
    <Form name="nest-messages" onFinish={onFinish} form={addressForm}>
      <p
        style={{
          color: "#555555",
          fontSize: "14px",
          fontWeight: 400,
          marginBottom: 0,
        }}
      >
        Tỉnh/Thành Phố:{" "}
      </p>
      <Form.Item
        name="provinceCity"
        style={{ width: "100%", marginBottom: 0 }}
        rules={[
          {
            required: true,
            message: "Nhập Tỉnh/Thành Phố!",
          },
        ]}
      >
        <Input placeholder="Tỉnh/Thành Phố" />
      </Form.Item>
      <p
        style={{
          color: "#555555",
          fontSize: "14px",
          fontWeight: 400,
          marginBottom: 0,
        }}
      >
        Quận/Huyện/Thành Phố:{" "}
      </p>
      <Form.Item
        name="districtTown"
        style={{ width: "100%", marginBottom: 0 }}
        rules={[
          {
            required: true,
            message: "Nhập Quận/Huyện/Thành Phố!",
          },
        ]}
      >
        <Input placeholder="Quận/Huyện/Thành Phố" />
      </Form.Item>
      <p
        style={{
          color: "#555555",
          fontSize: "14px",
          fontWeight: 400,
          marginBottom: 0,
        }}
      >
        Xã/Phường:{" "}
      </p>
      <Form.Item
        name="neighborhoodVillage"
        style={{ width: "100%", marginBottom: 0 }}
        rules={[
          {
            required: true,
            message: "Nhập Xã/Phường!",
          },
        ]}
      >
        <Input placeholder="Xã/Phường" />
      </Form.Item>
      <p
        style={{
          color: "#555555",
          fontSize: "14px",
          fontWeight: 400,
          marginBottom: 0,
        }}
      >
        Địa Chỉ:{" "}
      </p>
      <Form.Item
        name="address"
        style={{ width: "100%", marginBottom: 0 }}
        rules={[
          {
            required: true,
            message: "Nhập Địa Chỉ!",
          },
        ]}
      >
        <Input placeholder="Tên người dùng" />
      </Form.Item>
      <div className="d-flex mt-3 d-flex justify-content-end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default EditAddress;
