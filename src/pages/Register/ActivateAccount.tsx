import { message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { appRoutes } from "../../routers/config";

const ActivateAccount = () => {
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(code);
    if (code) {
      httpClient()
        .get(APP_API.active1.replace(":activeCode", code))
        .then(() => {
          navigate(appRoutes.login);
          message.success("Đăng Ký Tài Khoản Thành Công!");
        })
        .catch(() => {
          console.error("Xác Thực Tài Khoản Thất Bại!");
          setShowError(true);
          setLoading(false);
          message.error("Xác Thực Tài Khoản Thất Bại!");
        });
    }
    // eslint-disable-next-line
  }, [code]);

  return (
    <Spin spinning={loading}>
      {showError && <h3>Mã Xác Thực Không Hợp Lệ</h3>}
    </Spin>
  );
};

export default ActivateAccount;
