import { Book, Category } from "../../../models/book";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Card, Rate } from "antd";
import Meta from "antd/lib/card/Meta";
import { httpClient } from "../../../httpClient/httpServices";
import { APP_API } from "../../../httpClient/config";
import { updateKeySearch } from "../../../redux/slices/keySearchSlice";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../../routers/config";
import NothingImg from "../../../image/bubbleNothing.jpg";

function MyFavouriteBooks() {
  const [myFavorBooks, setMyFavorBooks] = useState<Book[]>([]);
  const getFavorBooks = () => {
    httpClient()
      .get(APP_API.getMyFavor)
      .then((res) => {
        setMyFavorBooks([...res.data]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };

  useEffect(() => {
    getFavorBooks();
  });

  return (
    <>
      <div className=" bg-white rounded-3 pt-3 min-vh-100">
        {/* {bookOfCategory(category.id)}; */}

        <div className="home-book-list  pb-4">
          {myFavorBooks?.length > 0 &&
            myFavorBooks?.map((book: Book, index) => (
              <div>
                {index < 10 && (
                  <Card
                    key={book.id}
                    hoverable
                    onClick={() => {
                      navigate(
                        appRoutes.bookDetail.replace(":id", book.id.toString())
                      );
                      window.scrollTo(0, 0);
                    }}
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
                                book.price - (book.price * book.discount) / 100
                              )}{" "}
                              ₫
                            </p>
                            {book.discount > 0 && (
                              <>
                                <p className="discountt">-{book.discount}%</p>
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
              </div>
            ))}
        </div>
        {myFavorBooks.length == 0 && (
          <div className="bg-white p-4 orderDetail-background-height d-flex justify-content-center align-items-center">
            <div>
              <img src={NothingImg} height="300" width="500" />
              <h2 className="d-flex justify-content-center">
                Chưa có sách yêu thích!
              </h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MyFavouriteBooks;
