import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const BreadCrumb = () => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capatilize = (s: any) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div>
        <Breadcrumb
          separator=">"
          style={{
            display: "flex",
            alignItems: "center",
            margin: "8px 0",
            fontSize: "16px",
            color: "red",
            paddingBottom: "0",
            fontFamily: "Time New Romans",
          }}
        >
          {pathnames.length > 0 ? (
            <Breadcrumb.Item>
              <Link to="/">Trang Chủ</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>Trang Chủ</Breadcrumb.Item>
          )}
          {pathnames.map((name, index) => {
            let namePage = "/";
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            switch (capatilize(name)) {
              case "Detail":
                namePage = "Chi Tiết";
                break;
              case "Search":
                namePage = "Tìm Kiếm";
                break;
              case "Cart":
                namePage = "Giỏ Hàng";
                break;
              case "Checkout":
                namePage = "Tiến Hành Đặt Hàng";
                break;
              case "Myprofile":
                namePage = "Thông Tin Cá Nhân";
                break;
              case "Update":
                namePage = "Cập Nhật Thông Tin";
                break;
              case "Password":
                namePage = "Cập Nhật Mật Khẩu";
                break;
              case "Myaddress":
                namePage = "Địa Chỉ";
                break;
              case "Add":
                namePage = "Thêm";
                break;
              case "Edit":
                namePage = "Cập Nhật";
                break;
              case "Mybill":
                namePage = "Lịch Sử Đơn Hàng";
                break;
              case "Login":
                namePage = "Đăng Nhập/Đăng Ký";
                break;
              case "Forgotpassword":
                namePage = "Quên Mật Khẩu";
                break;
              case "Reset":
                namePage = "Cập Nhật Mật Khẩu";
                break;
              case "Active":
                namePage = "Xác Thực Tài Khoản";
                break;
              case "Myfavouritebooks":
                namePage = "Yêu Thích";
                break;
              case "Onlinepayordersuccess":
                namePage = "Đặt Hàng";
                break;
              default:
                namePage = capatilize(name);
                break;
            }
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Breadcrumb.Item>{namePage}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item>
                <Link to={`${routeTo}`} onClick={() => window.scroll(0, 0)}>
                  {namePage}
                </Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };

  return <>{breadCrumbView()}</>;
};

export default BreadCrumb;
