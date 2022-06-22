import {
  faUser,
  faSearchLocation,
  faCommentDollar,
  faKey,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { APP_API } from "../../../httpClient/config";
import { httpClient } from "../../../httpClient/httpServices";
import { UserInfo } from "../../../models/auth";
import { openAccountManage } from "../../../redux/slices/authSlice";
import { appRoutes } from "../../../routers/config";

// interface AccountSideBarProps {
//   selectedMenu: string;
// }

const AccountSideBar = (): JSX.Element => {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(
    location.pathname.split("/")[1] || "myprofile"
  );
  const userInfo = useSelector(
    (state: RootStateOrAny) => state.authSlice.userInfo as UserInfo
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo.image) console.log(userInfo.image);
    httpClient()
      .get(APP_API.userInfo)
      .then((res) => {
        console.log(res);

        console.log(res.data.image);
      });
  }, [userInfo.image]);
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["myprofile"]}
        style={{ height: "100%", borderRight: 0 }}
        selectedKeys={[selectedMenu]}
      >
        <div
          style={{
            paddingLeft: 15,
            paddingTop: 10,
            paddingBottom: 10,
            fontSize: 17,
            display: "flex",
            fontFamily: "Times New Roman",
          }}
        >
          <img
            alt="userInfoImage"
            src={userInfo!.image}
            height={30}
            width={30}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          ></img>
          <div>
            <p
              style={{
                marginBottom: 0,
                paddingBottom: 0,
                marginTop: 8,
                paddingLeft: 6,
                fontSize: 13,
                fontFamily: "Times New Roman",
                color: "gray",
              }}
            >
              Tài Khoản
            </p>
            <p
              style={{
                marginBottom: 0,
                paddingBottom: 0,
                marginTop: 16,
                paddingLeft: 6,
              }}
            >
              {userInfo!.lastName + " " + userInfo!.firstName}
            </p>
          </div>
        </div>

        <Divider
          style={{ paddingTop: 0, marginTop: 0, marginBottom: 0 }}
        ></Divider>
        <Menu.Item key="myprofile">
          <Link
            to={appRoutes.myAccount}
            className="font-submenu-side-bar"
            color="#555555"
            onClick={() => {
              window.scrollTo(0, 0);
              setSelectedMenu("myprofile");
            }}
          >
            <FontAwesomeIcon className="mr-2" icon={faUser} color="#0099FF" />{" "}
            Thông Tin Cá Nhân
          </Link>
        </Menu.Item>
        <Menu.Item key="password" onClick={() => dispatch(openAccountManage())}>
          <Link
            to={appRoutes.updatePassword}
            className="font-submenu-side-bar"
            color="#555555"
            onClick={() => {
              window.scrollTo(0, 0);
              setSelectedMenu("password");
            }}
          >
            <FontAwesomeIcon className="mr-2" icon={faKey} color="#FF9900" />{" "}
            Thiết Lập Mật Khẩu
          </Link>
        </Menu.Item>
        <Menu.Item key="myaddress">
          <Link
            to={appRoutes.address}
            className="font-submenu-side-bar"
            color="#555555"
            onClick={() => {
              window.scrollTo(0, 0);
              setSelectedMenu("myaddress");
            }}
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={faSearchLocation}
              color="#339900"
            />{" "}
            Địa Chỉ
          </Link>
        </Menu.Item>

        <Menu.Item key="mybill" onClick={() => dispatch(openAccountManage())}>
          <Link
            to={appRoutes.purchase}
            className="font-submenu"
            color="#555555"
            onClick={() => {
              window.scrollTo(0, 0);
              setSelectedMenu("mybill");
            }}
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={faCommentDollar}
              color="#FF9900"
            />{" "}
            Đơn Hàng
          </Link>
        </Menu.Item>
        <Menu.Item
          key="myfavouritebooks"
          onClick={() => dispatch(openAccountManage())}
        >
          <Link
            to={appRoutes.myFavouriteBooks}
            className="font-submenu"
            color="#555555"
            onClick={() => {
              window.scrollTo(0, 0);
              setSelectedMenu("myfavouritebooks");
            }}
          >
            <FontAwesomeIcon className="mr-2" icon={faHeart} color="#CC3333" />{" "}
            Yêu Thích
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AccountSideBar;
