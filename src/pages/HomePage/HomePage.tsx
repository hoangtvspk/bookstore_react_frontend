import {
  faArrowAltCircleRight,
  faBars,
  faBook,
  faBookOpen,
  faGifts,
  faShoppingBasket,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Carousel, Rate, Tabs } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageFooter from "../../components/Footer/Footer";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import Banner1 from "../../image/sachhaydoche.jpg";
import Banner2 from "../../image/chiasesachhay.png";
import Banner3 from "../../image/happyreading.png";
import Banner4 from "../../image/docsachtrongcay.jpg";
import discount from "../../image/discount.jpg";
import BookLogo from "../../image/logoLeft.png";
import NewBook from "../../image/newbook.jpg";
import TopSelling from "../../image/topsellingbook.png";
import { Book } from "../../models/book";
import { appRoutes } from "../../routers/config";
import "./HomePage.css";
import { UserOutlined } from "@ant-design/icons";
import { Category } from "../../models/categoryBooks";
import HomeCategory from "./HomeCategory";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { updateKeySearch } from "../../redux/slices/keySearchSlice";

const { TabPane } = Tabs;
const DEFAULT_PAGE_SIZE = 30;

function HomePage() {
  const [newBookArray, setNewBookArray] = useState<Book[]>([]);
  const [bestSellingBookArray, setBestSellingBookArray] = useState<Book[]>([]);
  const [bestDiscountBookArray, setBestDiscountBookArray] = useState<Book[]>(
    []
  );
  const [bookOfCate, setBookOfCate] = useState<Book[]>([]);
  const [categoryArray, setCategoryArray] = useState<Category[]>([]);
  const navigate = useNavigate();
  const [value, setValue] = useState(2);
  const [curPage, setCurPage] = useState(1);
  const [price, setPrice] = useState("");

  const onCardClick = (id: string) => {
    navigate(appRoutes.bookDetail.replace(":id", id));
    window.scrollTo(0, 0);
  };
  const onPageChange = (page: number, pageSize: number) => {
    setCurPage(page);
  };

  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };

  const booksSearch = useSelector((state: RootStateOrAny) => {
    return state.keySearchSlice.booksSearch;
  });
  const keySearch = useSelector((state: RootStateOrAny) => {
    return state.keySearchSlice.booksSearch.keySearch;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem("breadcrumb", "List");
    httpClient()
      .get(APP_API.newBook)
      .then((res) => {
        setNewBookArray([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    httpClient()
      .get(APP_API.bestSellingBook)
      .then((res) => {
        setBestSellingBookArray([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    httpClient()
      .get(APP_API.bestDiscountBook)
      .then((res) => {
        setBestDiscountBookArray([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    httpClient()
      .get(APP_API.categoryBooks)
      .then((res) => {
        console.log(res);
        setCategoryArray([...res.data]);
        console.log(categoryArray);
      })
      .catch((err) => {
        console.log(err);
      });
    // bookOfCategory(1);
  }, []);

  return (
    <>
      <div className="pr-3 pb-3">
        <div className="bg-white pb-4 rounded-3">
          <h3 className="home-title">
            {" "}
            <FontAwesomeIcon className="mr-2" icon={faGifts} color="#FF6666" />
            Sự kiện đang diễn ra
          </h3>
          <Carousel autoplay>
            <img className="image-banner" src={Banner2}></img>
            <img className="image-banner" src={Banner1}></img>
            <img className="image-banner" src={Banner3}></img>
            <img className="image-banner" src={Banner4}></img>
          </Carousel>
        </div>

        <div className=" bg-white rounded-3">
          <h3 className=" shoppingNow mt-2 mb-0 pt-4 pb-0">
            <FontAwesomeIcon
              className="mr-2"
              icon={faShoppingBasket}
              color="#339900"
            />
            Mua Sắm Ngay!
          </h3>
          <Tabs defaultActiveKey="1" className="bg-white mt-0 pb-3">
            <TabPane tab="Mới Cập Nhật" key="1">
              <div className="">
                <div className="">
                  <div className="home-book-list">
                    {newBookArray.length > 0 &&
                      newBookArray.map((book: Book) => (
                        <Card
                          key={book.id}
                          hoverable
                          onClick={() => onCardClick(book.id.toString())}
                          cover={
                            <img
                              className="home-preview-image"
                              alt={book.nameBook}
                              src={book.bookImages[0]?.image}
                            />
                          }
                        >
                          <Meta
                            title={book.nameBook}
                            description={
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    marginBottom: "0px",
                                    alignItems: "end",
                                  }}
                                >
                                  <p
                                    style={{
                                      color: "rgb(255, 66, 78)",
                                      marginBottom: "0",
                                      fontSize: "15px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {stringPrice(
                                      book.price -
                                        (book.price * book.discount) / 100
                                    )}{" "}
                                    ₫
                                  </p>
                                  {book.discount > 0 && (
                                    <>
                                      <p className="discountt">
                                        -{book.discount}%
                                      </p>
                                    </>
                                  )}
                                </div>
                                <div>
                                  <Rate
                                    value={book.rating}
                                    disabled
                                    style={{
                                      fontSize: "15px",
                                    }}
                                  ></Rate>
                                </div>
                              </>
                            }
                          />
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Thịnh Hành" key="2">
              <div className="">
                <div className="">
                  <div className="home-book-list">
                    {bestSellingBookArray.length > 0 &&
                      bestSellingBookArray.map((book: Book) => (
                        <Card
                          key={book.id}
                          hoverable
                          onClick={() => onCardClick(book.id.toString())}
                          cover={
                            <img
                              className="home-preview-image"
                              alt={book.nameBook}
                              src={book.bookImages[0]?.image}
                            />
                          }
                        >
                          <Meta
                            title={book.nameBook}
                            description={
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    marginBottom: "0px",
                                    alignItems: "end",
                                  }}
                                >
                                  <p
                                    style={{
                                      color: "rgb(255, 66, 78)",
                                      marginBottom: "0",
                                      fontSize: "15px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {stringPrice(
                                      book.price -
                                        (book.price * book.discount) / 100
                                    )}{" "}
                                    ₫
                                  </p>
                                  {book.discount > 0 && (
                                    <>
                                      <p className="discountt">
                                        -{book.discount}%
                                      </p>
                                    </>
                                  )}
                                </div>
                                <div>
                                  <Rate
                                    value={book.rating}
                                    disabled
                                    style={{
                                      fontSize: "15px",
                                    }}
                                  ></Rate>
                                </div>
                              </>
                            }
                          />
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Khuyến Mãi Cao" key="3">
              <div className="">
                <div className="">
                  <div className="home-book-list">
                    {bestDiscountBookArray.length > 0 &&
                      bestDiscountBookArray.map((book: Book, index) => (
                        <>
                          {index < 10 && (
                            <Card
                              key={book.id}
                              hoverable
                              onClick={() => onCardClick(book.id.toString())}
                              cover={
                                <img
                                  className="home-preview-image"
                                  alt={book.nameBook}
                                  src={book.bookImages[0]?.image}
                                />
                              }
                            >
                              <Meta
                                title={book.nameBook}
                                description={
                                  <>
                                    <div
                                      style={{
                                        display: "flex",
                                        marginBottom: "0px",
                                        alignItems: "end",
                                      }}
                                    >
                                      <p
                                        style={{
                                          color: "rgb(255, 66, 78)",
                                          marginBottom: "0",
                                          fontSize: "15px",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {stringPrice(
                                          book.price -
                                            (book.price * book.discount) / 100
                                        )}{" "}
                                        ₫
                                      </p>
                                      {book.discount > 0 && (
                                        <>
                                          <p className="discountt">
                                            -{book.discount}%
                                          </p>
                                        </>
                                      )}
                                    </div>
                                    <div>
                                      <Rate
                                        value={book.rating}
                                        disabled
                                        style={{
                                          fontSize: "15px",
                                        }}
                                      ></Rate>
                                    </div>
                                  </>
                                }
                              />
                            </Card>
                          )}
                        </>
                      ))}
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
        <div className="bg-white pb-4 mt-2 mb-0 pt-4 rounded-3">
          <h4 className="bg-white shoppingNow ">
            <FontAwesomeIcon className="mr-2" icon={faBars} color="#993300" />
            Danh Mục Sản Phẩm
          </h4>
          <div className="home-cate-list ">
            {categoryArray.length > 0 &&
              categoryArray.map((category: Category) => (
                <div
                  className="align-content-center justify-content-center align-items-center"
                  onClick={() => {
                    dispatch(
                      updateKeySearch({
                        idCategory: category.id,
                        keyWord: "",
                        minPrice: 0,
                        maxPrice: 100000000,
                      })
                    );
                    navigate(appRoutes.books);
                    window.scrollTo(0, 0);
                  }}
                >
                  {/* {bookOfCategory(category.id)}; */}
                  <img
                    className="cate-preview-image"
                    alt={category.nameCategory}
                    src={category.image}
                  />
                  <div
                    className="justify-content-center align-items-center d-flex"
                    style={{ fontSize: 13 }}
                  >
                    {category.nameCategory}
                  </div>
                </div>
              ))}
          </div>
        </div>
        {categoryArray.length > 0 &&
          categoryArray.map((category: Category) => (
            <HomeCategory category={category} />
          ))}
      </div>
    </>
  );
}

export default HomePage;
