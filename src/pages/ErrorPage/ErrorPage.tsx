import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emptyCart from "../../image/error404.jpg";
import { appRoutes } from "../../routers/config";
import "./ErrorPage.css";

function ErrorPage() {
  useEffect(() => {}, []);
  const navigate = useNavigate();
  return (
    <div className="error-page bg-white pt-5 pb-5 rounded-3">
      <div>
        {" "}
        <img alt="error image" src={emptyCart} height="270" width="300" />
        <h5 className="d-flex justify-content-center">Lỗi 404 rồi :((</h5>
        <span>
          Đừng lo, hãy kiểm tra lại lỗi chính tả hoặc trở về trang chủ!
        </span>
        <div className="backhome-btn-background">
          <Button
            className="backhome-btn"
            onClick={() => {
              navigate(appRoutes.home);

              window.scrollTo(0, 0);
            }}
          >
            Quay Về Trang Chủ
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
