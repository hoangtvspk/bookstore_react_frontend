import {
  faBars,
  faGifts,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel, Image, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import ImageGallery from "react-image-gallery";
import { Book } from "../../models/book";
import { Category } from "../../models/categoryBooks";
import { Event } from "../../models/event";
import { updateKeySearch } from "../../redux/slices/keySearchSlice";
import { appRoutes } from "../../routers/config";
import BookCard from "./BookCard";
import HomeCategory from "./HomeCategory";
import "./HomePage.css";
import { Link } from "react-router-dom";
import NewBooksIcon from "../../image/newBooksIcon.png";
import TredingBooksIcon from "../../image/trending.png";
import SaleBooksIcon from "../../image/sale.png";

const { TabPane } = Tabs;

function HomePage() {
  const [newBookArray, setNewBookArray] = useState<Book[]>([]);
  const [bestSellingBookArray, setBestSellingBookArray] = useState<Book[]>([]);
  const [bestDiscountBookArray, setBestDiscountBookArray] = useState<Book[]>(
    []
  );
  const [submitting, setSubmitting] = useState(true);

  const [categoryArray, setCategoryArray] = useState<Category[]>([]);
  const [events, setEvent] = useState<Event[]>([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    // getEvents();
    localStorage.setItem("breadcrumb", "List");
    httpClient()
      .get(APP_API.getEvents)
      .then((res) => {
        setEvent([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitting(false));
    httpClient()
      .get(APP_API.newBook)
      .then((res) => {
        setNewBookArray([...res.data]);
        console.log(res.data);
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
  const onChange = () => {};
  const [tab1TitleColor, set1TabTitleColor] = useState("#0099FF");
  const [tab2TitleColor, set2TabTitleColor] = useState("white");
  const [tab3TitleColor, set3TabTitleColor] = useState("white");
  return (
    <>
      <div className=" pb-3">
        <div className="  rounded-3 ">
          <div className="d-flex justify-content-between rounded-3">
            <div className="events-image mr-2 rounded-3">
              <Carousel autoplay afterChange={onChange}>
                {Object.entries(events).length > 0 &&
                  events
                    .slice()
                    .reverse()
                    .map((event: Event) => (
                      <img
                        className="rounded-3"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(
                            appRoutes.eventDetail.replace(
                              ":id",
                              event.id.toString()
                            )
                          )
                        }
                        src={event.image}
                        height="320px"
                      ></img>
                    ))}
              </Carousel>
            </div>
            <div>
              {events
                .slice()
                .reverse()
                .map((event: Event, index) => (
                  <>
                    {index < 2 && (
                      <div className="mb-1">
                        <img
                          className="rounded-3"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(
                              appRoutes.eventDetail.replace(
                                ":id",
                                event.id.toString()
                              )
                            )
                          }
                          width="370px"
                          height="145px"
                          src={event.image}
                        ></img>
                      </div>
                    )}
                  </>
                ))}
              <div className="d-flex justify-content-end">
                <Link to={appRoutes.eventList} style={{ color: "#FFFF99" }}>
                  -------------------------Tất Cả Sự
                  Kiện-------------------------
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className=" bg-white rounded-3">
          <Tabs
            defaultActiveKey="1"
            className=" rounded-3 bg-white pb-3 mt-2  "
            // size="large"
            tabBarStyle={{ backgroundColor: "#FFCC99", paddingLeft: 0 }}
            onTabClick={(key) => {
              if (key === "1") {
                set1TabTitleColor("#0099FF");
                set2TabTitleColor("white");
                set3TabTitleColor("white");
              } else if (key === "2") {
                set1TabTitleColor("white");
                set2TabTitleColor("#0099FF");
                set3TabTitleColor("white");
              } else {
                set1TabTitleColor("white");
                set2TabTitleColor("white");
                set3TabTitleColor("#0099FF");
              }
            }}
          >
            <TabPane
              tab={
                <div
                  style={{
                    color: tab1TitleColor,
                    fontSize: "16px",
                    fontFamily: "Helvetica",
                  }}
                >
                  <img width={30} height={30} src={NewBooksIcon}></img> Mới Cập
                  Nhật
                </div>
              }
              key="1"
              style={{ paddingLeft: 0 }}
            >
              <div className="">
                <div className="">
                  <div className="home-book-list">
                    {newBookArray.length > 0 &&
                      newBookArray.map((book: Book, index) => (
                        <>{index < 12 && <BookCard book={book}></BookCard>}</>
                      ))}
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <div
                  style={{
                    color: tab2TitleColor,
                    fontSize: "16px",
                    fontFamily: "Helvetica",
                  }}
                >
                  <img width={30} height={30} src={TredingBooksIcon}></img>{" "}
                  Thịnh Hành
                </div>
              }
              key="2"
            >
              <div className="">
                <div className="">
                  <div className="home-book-list">
                    {bestSellingBookArray.length > 0 &&
                      bestSellingBookArray.map((book: Book, index) => (
                        <>{index < 12 && <BookCard book={book}></BookCard>}</>
                      ))}
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <div
                  style={{
                    color: tab3TitleColor,
                    fontSize: "16px",
                    fontFamily: "Helvetica",
                  }}
                >
                  <img width={30} height={30} src={SaleBooksIcon}></img> Ưu Đãi
                </div>
              }
              key="3"
            >
              <div className="">
                <div className="">
                  <div className="home-book-list">
                    {bestDiscountBookArray.length > 0 &&
                      bestDiscountBookArray.map((book: Book, index) => (
                        <>{index < 12 && <BookCard book={book}></BookCard>}</>
                      ))}
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
        <div className="bg-white pb-4 mt-2 mb-0 pt-4 rounded-3">
          <h4 className=" shoppingNow ">
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
