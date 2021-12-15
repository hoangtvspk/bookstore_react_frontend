import {
  faCartArrowDown,
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Divider, Layout, Menu, Row } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../image/book2.png";
import { userLogOut } from "../../../redux/slices/authSlice";
import { appRoutes } from "../../../routers/config";
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
          height: "230px",
        }}
      >
        <Row gutter={16}>
          <Col className="gutter-row menu" span="6" offset="10">
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
              <img src={logo} alt="logo" className="logo" />
            </Menu>
          </Col>
          <Col className="gutter-row menu" span="6" offset="2">
            <Link to={appRoutes.home}>
              <FontAwesomeIcon className="mr-2" icon={faCartArrowDown} />
            </Link>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col className="gutter-row menu" span="6">
            <Menu
              theme="dark"
              mode="horizontal"
              triggerSubMenuAction="hover"
              selectedKeys={[selectedMenu]}
            >
              <Menu.Item key="home" onClick={() => setSelectedMenu("home")}>
                <Link to={appRoutes.home}>
                  <FontAwesomeIcon className="mr-2" icon={faHome} />
                  Home
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col className="gutter-row" span="6" offset="12">
            {isLoggedIn && (
              <>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  style={{ background: "Transparent" }}
                  selectedKeys={[selectedMenu]}
                >
                  <SubMenu key="name" title={userName}>
                    <Menu.Item key="my-account">
                      <FontAwesomeIcon className="mr-2" icon={faUser} />
                      <Link to={appRoutes.myAccount}>My account</Link>
                    </Menu.Item>
                    <Divider className="m-0" />
                    <Menu.Item
                      key="logout"
                      onClick={() => dispatch(userLogOut())}
                    >
                      <FontAwesomeIcon className="mr-2" icon={faSignOutAlt} />
                      <Link to={appRoutes.login}>Log Out</Link>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  style={{ background: "Transparent" }}
                  selectedKeys={[selectedMenu]}
                >
                  <Menu.Item
                    key="login"
                    onClick={() => setSelectedMenu("login")}
                  >
                    <FontAwesomeIcon className="mr-2" icon={faSignInAlt} />
                    <Link to={appRoutes.login}>Login</Link>
                  </Menu.Item>

                  <Menu.Item
                    key="register"
                    onClick={() => setSelectedMenu("register")}
                  >
                    <FontAwesomeIcon className="mr-2" icon={faUserPlus} />
                    <Link to={appRoutes.register}>Register</Link>
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
          padding: 230,

          margin: 0,
        }}
      >
        <div>{children}</div>
      </Content>
    </Layout>
  );
};

export default NavBar;
