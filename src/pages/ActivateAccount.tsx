import { message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { APP_API } from "../httpClient/config";
import { httpClient } from "../httpClient/httpServices";
import { appRoutes } from "../routers/config";

const ActivateAccount = () => {
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const { code } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location);
    if (code) {
      httpClient()
        .get(APP_API.active1.replace(":activeCode", code)) //"registration/activate/:activeCode"
        .then(() => {
          navigate(appRoutes.login);
          message.success("Account activated! Please login again.");
        })
        .catch(() => {
          console.error("Failed to activate account");
          setShowError(true);
          setLoading(false);
          message.error("Error Activation!");
        });
    }
    // eslint-disable-next-line
  }, [code]);

  return (
    <Spin spinning={loading}>
      {showError && <h3>Incorrect activate code</h3>}
    </Spin>
  );
};

export default ActivateAccount;
