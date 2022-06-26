import {
  faBars,
  faGifts,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import Banner2 from "../../image/chiasesachhay.png";
import Banner4 from "../../image/docsachtrongcay.jpg";
import Banner3 from "../../image/happyreading.png";
import Banner1 from "../../image/sachhaydoche.jpg";
import { Book } from "../../models/book";
import { Category } from "../../models/categoryBooks";
import { updateKeySearch } from "../../redux/slices/keySearchSlice";
import { appRoutes } from "../../routers/config";
import BookCard from "./BookCard";
import HomeCategory from "./HomeCategory";
import "./HomePage.css";

const { TabPane } = Tabs;

function HomePage() {
  const [newBookArray, setNewBookArray] = useState<Book[]>([]);
  const [bestSellingBookArray, setBestSellingBookArray] = useState<Book[]>([]);
  const [bestDiscountBookArray, setBestDiscountBookArray] = useState<Book[]>(
    []
  );

  const [categoryArray, setCategoryArray] = useState<Category[]>([]);
  const navigate = useNavigate();

  const onCardClick = (id: string) => {
    navigate(appRoutes.bookDetail.replace(":id", id));
    window.scrollTo(0, 0);
  };

  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };

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
      <div className=" pb-3">
        <div className="bg-white pb-4 rounded-3">
          <h3 className="home-title">
            {" "}
            <FontAwesomeIcon className="mr-2" icon={faGifts} color="#FF6666" />
            Sự kiện đang diễn ra
          </h3>
          <Carousel autoplay>
            <img alt="banner" className="image-banner" src={Banner2}></img>
            <img alt="banner" className="image-banner" src={Banner1}></img>
            <img alt="banner" className="image-banner" src={Banner3}></img>
            <img alt="banner" className="image-banner" src={Banner4}></img>
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
                      newBookArray.map((book: Book, index) => (
                        <>{index < 10 && <BookCard book={book}></BookCard>}</>
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
                      bestSellingBookArray.map((book: Book, index) => (
                        <>{index < 10 && <BookCard book={book}></BookCard>}</>
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
                        <>{index < 10 && <BookCard book={book}></BookCard>}</>
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
