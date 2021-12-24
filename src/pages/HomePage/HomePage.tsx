import { Card, RadioChangeEvent } from "antd";
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

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const onCardClick = (id: string) => {
    navigate(appRoutes.bookDetail.replace(":id", id));
  };
  const onPageChange = (page: number, pageSize: number) => {
    setCurPage(page);
  };

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
      <div className="d-flex bg-white pr-3 mt-3 pb-3">
        <div className="pt-5 mr-4 home-facet-list ">
          <img src={NewBook} className="home-type-book-image"></img>
        </div>
        <div className="home-right-content">
          <h2 className="home-title-text">New Updates</h2>
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
                  <Meta title={book.nameBook} description={book.price + "đ"} />
                </Card>
              ))}
          </div>
        </div>
      </div>
      <div className="d-flex bg-white pr-3 mt-3 pb-3">
        <div className="pt-5 mr-4 home-facet-list ">
          <img src={TopSelling} className="home-type-book-image"></img>
        </div>
        <div className="home-right-content">
          <h2 className="home-title-text">Top Selling Books</h2>
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
                  <Meta title={book.nameBook} description={book.price + "đ"} />
                </Card>
              ))}
          </div>
        </div>
      </div>
      <div className="d-flex bg-white pr-3 mt-3 pb-3">
        <div className="pt-5 mr-4 home-facet-list ">
          <img src={discount} className="home-type-book-image"></img>
        </div>
        <div className="home-right-content">
          <h2 className="home-title-text">Best Discounts</h2>
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
                  <Meta title={book.nameBook} description={book.price + "đ"} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
