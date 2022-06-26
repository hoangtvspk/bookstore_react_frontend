import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  faCommentDollar,
  faSearchLocation,
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Col, Layout, Menu, Row } from "antd";
import Search from "antd/lib/input/Search";
import SubMenu from "antd/lib/menu/SubMenu";
import { ChangeEvent, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../image/doubhlogo7.png";
import mainBackground from "../../../image/mainBackground.png";
import { UserInfo } from "../../../models/auth";
import {
  closeAccountManage,
  openAccountManage,
  userLogOut,
} from "../../../redux/slices/authSlice";
import { updateKeySearch } from "../../../redux/slices/keySearchSlice";
import { appRoutes } from "../../../routers/config";
import BreadCrumb from "../../BreadCrumb";
import PageFooter from "../../Footer/Footer";
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
        state.authSlice.userInfo.lastName +
        " " +
        state.authSlice.userInfo.firstName
      );
    } else return "";
  });
  const userInfo = useSelector((state: RootStateOrAny) => {
    if (state.authSlice.userInfo) {
      return state.authSlice.userInfo as UserInfo;
    }
  });
  const booksSearch = useSelector((state: RootStateOrAny) => {
    return state.keySearchSlice.booksSearch;
  });

  const dispatch = useDispatch();
  // const onSearch = (key: String) => {
  //   <Link to={appRoutes.books.replace(":search", key)}>
  //     <img src={logo} alt="logo" className="logo" />
  //   </Link>;
  // };
  const [keyWordSearch, setKeyWordSearch] = useState("");

  const onKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (booksSearch.keyWord != null) {
      setKeyWordSearch(e.target.value);
      console.log(booksSearch);
      dispatch(
        updateKeySearch({
          idCategory: booksSearch.idCategory,
          keyWord: e.target.value,
          minPrice: 0,
          maxPrice: 100000000,
        })
      );
    }
  };

  const navigate = useNavigate();
  useEffect(() => {}, [userInfo]);
  return (
    <Layout className="layout">
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          height: "80px",
        }}
      >
        <div
          className="d-flex headerNavBar"
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            width: "1270px",
            margin: "0 auto",
          }}
        >
          <Link
            className="mr-4"
            to={appRoutes.home}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <div
            style={{ minWidth: "60%", marginRight: "20px", marginLeft: "20px" }}
          >
            <Search
              placeholder="Hôm nay bạn tìm sách gì..."
              enterButton="Tìm Kiếm"
              size="large"
              onChange={onKeyChange}
              onSearch={() => {
                if (booksSearch.keyWord != null) {
                  dispatch(
                    updateKeySearch({
                      idCategory: booksSearch.idCategory,
                      keyWord: keyWordSearch,
                      minPrice: 0,
                      maxPrice: 100000000,
                    })
                  );
                }

                navigate(appRoutes.books);
                window.scrollTo(0, 0);
              }}
              className="bg-transparent mr-6"
            />
          </div>
          {isLoggedIn && (
            <>
              <div style={{ minWidth: "15%" }}>
                <Menu
                  mode="horizontal"
                  style={{
                    background: "Transparent",
                    paddingRight: 0,
                    marginRight: 0,
                  }}
                  selectedKeys={[selectedMenu]}
                  theme="dark"
                >
                  <SubMenu
                    key="name"
                    title={userName}
                    className=" font-text"
                    style={{ paddingRight: 0, marginRight: 0 }}
                    icon={
                      <>
                        {
                          <img
                            src={userInfo?.image}
                            height={30}
                            width={30}
                            style={{ borderRadius: "50%", objectFit: "cover" }}
                          ></img>
                        }
                        &nbsp;
                      </>
                    }
                  >
                    <Menu.Item key="my-account">
                      <Link
                        to={appRoutes.myAccount}
                        className="font-submenu"
                        color="#555555"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faUser}
                          color="#0099FF"
                        />
                        Thông Tin Cá Nhân
                      </Link>
                    </Menu.Item>

                    <Menu.Item
                      key="address"
                      onClick={() => dispatch(closeAccountManage())}
                    >
                      <Link
                        to={appRoutes.address}
                        className="font-submenu"
                        color="#555555"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faSearchLocation}
                          color="#339900"
                        />
                        Địa Chỉ
                      </Link>
                    </Menu.Item>

                    <Menu.Item
                      key="bill"
                      onClick={() => dispatch(openAccountManage())}
                    >
                      <Link
                        to={appRoutes.purchase}
                        className="font-submenu"
                        color="#555555"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faCommentDollar}
                          color="#FF9900"
                        />
                        Đơn Hàng
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      key="logout"
                      onClick={() => dispatch(userLogOut())}
                    >
                      <Link
                        to={appRoutes.login}
                        className="font-submenu"
                        color="#555555"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faSignOutAlt}
                          color="#CC6633"
                        />
                        Đăng Xuất
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </div>
              <Link
                to={appRoutes.cart}
                className=" font-text"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Badge count={totalCartItem}>
                  <ShoppingCartOutlined
                    style={{ fontSize: 40, color: "white" }}
                  />
                </Badge>
                Giỏ Hàng
              </Link>
            </>
          )}
          {!isLoggedIn && (
            <>
              <div style={{ minWidth: "15%" }}>
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
                    <Link
                      to={appRoutes.login}
                      className=" font-text"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      Đăng Nhập/Đăng Ký
                    </Link>
                  </Menu.Item>
                </Menu>
              </div>
              <Link
                to={appRoutes.cart}
                className=" font-text"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <ShoppingCartOutlined
                  style={{ fontSize: 40, color: "white" }}
                />
                Giỏ Hàng
              </Link>
            </>
          )}
        </div>
        {/* <Row className="headerNavBar">
          <Col className="gutter-row menu" span={4}>
            <Menu
              mode="horizontal"
              triggerSubMenuAction="hover"
              selectedKeys={[selectedMenu]}
              className="bg-transparent"
            >
              <Menu.Item key="home" onClick={() => setSelectedMenu("home")}>
                <Link
                  to={appRoutes.home}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <img src={logo} alt="logo" className="logo" />
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col className="gutter-row menu bg-transparent" span={13} push={0}>
            <Search
              placeholder="Hôm nay bạn tìm sách gì..."
              enterButton="Tìm Kiếm"
              size="large"
              onChange={onKeyChange}
              onSearch={() => {
                if (booksSearch.keyWord != null) {
                  dispatch(
                    updateKeySearch({
                      idCategory: booksSearch.idCategory,
                      keyWord: keyWordSearch,
                      minPrice: 0,
                      maxPrice: 100000000,
                    })
                  );
                }

                navigate(appRoutes.books);
                window.scrollTo(0, 0);
              }}
              className="bg-transparent"
            />
          </Col>

          <Col className="gutter-row" span="7" push={1}>
            {isLoggedIn && (
              <>
                <Menu
                  mode="horizontal"
                  style={{ background: "Transparent" }}
                  selectedKeys={[selectedMenu]}
                  theme="dark"
                >
                  <SubMenu
                    key="name"
                    title={userName}
                    className=" font-text"
                    icon={
                      <>
                        {
                          <img
                            src={userInfo?.image}
                            height={30}
                            width={30}
                            style={{ borderRadius: "50%", objectFit: "cover" }}
                          ></img>
                        }
                        &nbsp;
                      </>
                    }
                  >
                    <Menu.Item key="my-account">
                      <Link
                        to={appRoutes.myAccount}
                        className="font-submenu"
                        color="#555555"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faUser}
                          color="#0099FF"
                        />
                        Thông Tin Cá Nhân
                      </Link>
                    </Menu.Item>

                    <Menu.Item
                      key="address"
                      onClick={() => dispatch(closeAccountManage())}
                    >
                      <Link
                        to={appRoutes.address}
                        className="font-submenu"
                        color="#555555"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faSearchLocation}
                          color="#339900"
                        />
                        Địa Chỉ
                      </Link>
                    </Menu.Item>

                    <Menu.Item
                      key="bill"
                      onClick={() => dispatch(openAccountManage())}
                    >
                      <Link
                        to={appRoutes.purchase}
                        className="font-submenu"
                        color="#555555"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faCommentDollar}
                          color="#FF9900"
                        />
                        Đơn Hàng
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      key="logout"
                      onClick={() => dispatch(userLogOut())}
                    >
                      <Link
                        to={appRoutes.login}
                        className="font-submenu"
                        color="#555555"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faSignOutAlt}
                          color="#CC6633"
                        />
                        Đăng Xuất
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="cart">
                    <Link
                      to={appRoutes.cart}
                      className=" font-text"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      <Badge count={totalCartItem} className="mr-2">
                        <ShoppingCartOutlined
                          style={{ fontSize: 40, color: "white" }}
                        />
                      </Badge>
                      Giỏ Hàng
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
                    <Link
                      to={appRoutes.login}
                      className=" font-text"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      Đăng Nhập/Đăng Ký
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="cart">
                    <Link
                      to={appRoutes.cart}
                      className=" font-text"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      <ShoppingCartOutlined
                        style={{ fontSize: 40, color: "white" }}
                      />
                      Giỏ Hàng
                    </Link>
                  </Menu.Item>
                </Menu>
              </>
            )}
          </Col>
        </Row> */}
      </Header>

      <Content
        className="site-layout-background"
        style={{
          width: "100%",
          paddingTop: "80px",
          paddingBottom: 0,
          paddingLeft: "3%",
          paddingRight: "3%",
          height: "100%",
          backgroundImage:
            'url("https://i.pinimg.com/originals/a0/e4/16/a0e416c3456f32ee898e79d573743436.jpg")',
        }}
      >
        <div
          style={{ width: "1200px", marginRight: "auto", marginLeft: "auto" }}
        >
          <BreadCrumb></BreadCrumb> {children} <PageFooter></PageFooter>
        </div>
      </Content>
    </Layout>
  );
};

export default NavBar;
