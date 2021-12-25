import { Card, Carousel, RadioChangeEvent, Rate } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import discount from "../../image/discount.jpg";
import NewBook from "../../image/newbook.jpg";
import TopSelling from "../../image/topsellingbook.png";
import { Book } from "../../models/book";
import { appRoutes } from "../../routers/config";
import "./HomePage.css";
import { Tabs } from "antd";
import ImageGallery from "react-image-gallery";
import Banner1 from "../../image/banner1.jpg";
import Banner2 from "../../image/banner2.jpg";
import Banner3 from "../../image/banner3.jpg";
import BookLogo from "../../image/logoLeft.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import PageFooter from "../../components/Footer/Footer";
const { TabPane } = Tabs;
const DEFAULT_PAGE_SIZE = 30;

function HomePage() {
  const [newBookArray, setNewBookArray] = useState<Book[]>([]);
  const [bestSellingBookArray, setBestSellingBookArray] = useState<Book[]>([]);
  const [bestDiscountBookArray, setBestDiscountBookArray] = useState<Book[]>(
    []
  );
  const navigate = useNavigate();
  const [value, setValue] = useState(2);
  const [curPage, setCurPage] = useState(1);
  const [price, setPrice] = useState("");

  const onCardClick = (id: string) => {
    navigate(appRoutes.bookDetail.replace(":id", id));
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
  const onChange = () => {};
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
  }, []);

  return (
    <>
      <div className=" bg-white pr-3 mt-3 pb-3">
        <div className="d-flex">
          <div className="pt-5 mr-4 home-facet-banner ">
            <img src={BookLogo}></img>
            <p className="allbook" onClick={() => navigate(appRoutes.books)}>
              {" "}
              <FontAwesomeIcon
                className="mr-2 fa-2x"
                icon={faArrowAltCircleRight}
              />
              See All Books Now!
            </p>
          </div>
          <div className="home-right-banner-content">
            <h1 className="home-title">DoubH Book Store</h1>
            <Carousel autoplay>
              <img className="image-banner" src={Banner2}></img>
              <img className="image-banner" src={Banner1}></img>
              <img className="image-banner" src={Banner3}></img>
            </Carousel>
          </div>
        </div>
        <h2 className="shoppingNow">Let's Shopping Now!</h2>
        <Tabs defaultActiveKey="1">
          <TabPane tab="New Updates" key="1">
            <div className="d-flex">
              <div className="pt-5 mr-4 home-facet-list ">
                <img src={NewBook} className="home-type-book-image"></img>
              </div>
              <div className="home-right-content">
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
                                }}
                              >
                                <p
                                  style={{
                                    color: "rgb(255, 66, 78)",
                                    marginBottom: "0",
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
                                    <p
                                      style={{
                                        color: "rgb(128, 128, 137) ",

                                        textDecoration: "line-through",
                                        paddingLeft: "8px",
                                        marginBottom: "0",
                                      }}
                                    >
                                      {stringPrice(book.price)} ₫
                                    </p>
                                    <p className="discountt">
                                      -{book.discount}%
                                    </p>
                                  </>
                                )}
                              </div>
                              <div>
                                <Rate value={book.rating} disabled></Rate>
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
          <TabPane tab="Top Selling Books" key="2">
            <div className="d-flex ">
              <div className="pt-5 mr-4 home-facet-list ">
                <img src={TopSelling} className="home-type-book-image"></img>
              </div>
              <div className="home-right-content">
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
                                }}
                              >
                                <p
                                  style={{
                                    color: "rgb(255, 66, 78)",
                                    marginBottom: "0",
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
                                    <p
                                      style={{
                                        color: "rgb(128, 128, 137) ",

                                        textDecoration: "line-through",
                                        paddingLeft: "8px",
                                        marginBottom: "0",
                                      }}
                                    >
                                      {stringPrice(book.price)} ₫
                                    </p>
                                    <p className="discountt">
                                      -{book.discount}%
                                    </p>
                                  </>
                                )}
                              </div>
                              <div>
                                <Rate value={book.rating} disabled></Rate>
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
          <TabPane tab="Best Discounts" key="3">
            <div className="d-flex">
              <div className="pt-5 mr-4 home-facet-list ">
                <img src={discount} className="home-type-book-image"></img>
              </div>
              <div className="home-right-content">
                <div className="home-book-list">
                  {bestDiscountBookArray.length > 0 &&
                    bestDiscountBookArray.map((book: Book) => (
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
                                }}
                              >
                                <p
                                  style={{
                                    color: "rgb(255, 66, 78)",
                                    marginBottom: "0",
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
                                    <p
                                      style={{
                                        color: "rgb(128, 128, 137) ",

                                        textDecoration: "line-through",
                                        paddingLeft: "8px",
                                        marginBottom: "0",
                                      }}
                                    >
                                      {stringPrice(book.price)} ₫
                                    </p>
                                    <p className="discountt">
                                      -{book.discount}%
                                    </p>
                                  </>
                                )}
                              </div>
                              <div>
                                <Rate value={book.rating} disabled></Rate>
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
        </Tabs>
      </div>
      <PageFooter></PageFooter>
    </>
  );
}

export default HomePage;
