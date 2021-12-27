import {
  faAddressCard,
  faBook,
  faCartArrowDown,
  faHome,
  faMoneyBill,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserCircle,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Col, Divider, Layout, Menu, Row } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../image/book3.png";
import { userLogOut } from "../../../redux/slices/authSlice";
import { appRoutes } from "../../../routers/config";
import BreadCrumb from "../../BreadCrumb";
import "./NavBar.css";

const { Header, Content } = Layout;

const NavBar: React.FC = ({ children }) => {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(
    location.pathname.split("/")[1] || "home"
  );
  const isLoggedIn = useSelector((state: RootStateOrAny) => {
    return state.authSlice.isAuth;
  });

  const totalCartItem = useSelector((state: RootStateOrAny) => {
    return state.cartSlice.total;
  });

  const userName = useSelector((state: RootStateOrAny) => {
    if (state.authSlice.userInfo) {
      return (
        state.authSlice.userInfo.firstName +
        " " +
        state.authSlice.userInfo.lastName
      );
    } else return "";
  });

  const dispatch = useDispatch();

  return (
    <Layout className="layout">
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          height: "160px",
        }}
      >
        <div className="nav-logo">
          <img src={logo} alt="logo" className="logo" />
        </div>

        <Row gutter={16}>
          <Col className="gutter-row menu" span="6">
            <Menu
              mode="horizontal"
              triggerSubMenuAction="hover"
              selectedKeys={[selectedMenu]}
              className="bg-transparent"
            >
              <Menu.Item key="home" onClick={() => setSelectedMenu("home")}>
                <Link to={appRoutes.home} className="font-text">
                  <FontAwesomeIcon className="mr-2" icon={faHome} />
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item key="books" onClick={() => setSelectedMenu("books")}>
                <Link to={appRoutes.books} className="font-text">
                  <FontAwesomeIcon className="mr-2" icon={faBook} />
                  All Books
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col className="gutter-row" span="6" offset="12">
            {isLoggedIn && (
              <>
                <Menu
                  mode="horizontal"
                  style={{ background: "Transparent" }}
                  selectedKeys={[selectedMenu]}
                >
                  <SubMenu
                    key="name"
                    title={userName}
                    className="font-name"
                    icon={
                      <FontAwesomeIcon className="mr-2" icon={faUserCircle} />
                    }
                  >
                    <Menu.Item key="my-account">
                      <FontAwesomeIcon className="mr-2" icon={faUser} />
                      <Link to={appRoutes.myAccount} className="font-submenu">
                        My Account
                      </Link>
                    </Menu.Item>
                    <Divider className="m-0" />
                    <Menu.Item key="address">
                      <FontAwesomeIcon className="mr-2" icon={faAddressCard} />
                      <Link to={appRoutes.address} className="font-submenu">
                        Address Manage
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="bill">
                      <FontAwesomeIcon className="mr-2" icon={faMoneyBill} />
                      <Link to={appRoutes.purchase} className="font-submenu">
                        My Purchase
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      key="logout"
                      onClick={() => dispatch(userLogOut())}
                    >
                      <FontAwesomeIcon className="mr-2" icon={faSignOutAlt} />
                      <Link to={appRoutes.login} className="font-submenu">
                        Log Out
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="cart">
                    <Link to={appRoutes.cart}>
                      <Badge count={totalCartItem}>
                        <FontAwesomeIcon
                          className="mr-2 text-white fa-2x"
                          icon={faCartArrowDown}
                        />
                      </Badge>
                    </Link>
                  </Menu.Item>
                </Menu>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Menu
                  mode="horizontal"
                  style={{ background: "Transparent" }}
                  selectedKeys={[selectedMenu]}
                >
                  <Menu.Item
                    key="login"
                    onClick={() => setSelectedMenu("login")}
                  >
                    <FontAwesomeIcon
                      className="mr-2  text-white"
                      icon={faSignInAlt}
                    />
                    <Link to={appRoutes.login} className=" font-text">
                      Login
                    </Link>
                  </Menu.Item>

                  <Menu.Item
                    key="register"
                    onClick={() => setSelectedMenu("register")}
                  >
                    <FontAwesomeIcon
                      className="mr-2 text-white"
                      icon={faUserPlus}
                    />
                    <Link to={appRoutes.register} className="  font-text">
                      Register
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="cart" onClick={() => setSelectedMenu("cart")}>
                    <Link to={appRoutes.cart}>
                      <FontAwesomeIcon
                        className="mr-2 text-white fa-2x"
                        icon={faCartArrowDown}
                      />
                    </Link>
                  </Menu.Item>
                </Menu>
              </>
            )}
          </Col>
        </Row>
      </Header>

      <Content
        className="site-layout-background"
        style={{
          paddingTop: 160,
          paddingBottom: 0,
          paddingLeft: 160,
          paddingRight: 160,
          margin: 0,
        }}
      >
        <BreadCrumb></BreadCrumb>
        <div style={{ marginTop: "0px", paddingTop: 0 }}>{children}</div>
      </Content>
    </Layout>
  );
};

export default NavBar;
