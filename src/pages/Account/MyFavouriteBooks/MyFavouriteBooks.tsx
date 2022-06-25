import { Card, Rate } from "antd";
import Meta from "antd/lib/card/Meta";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/Layout/PageTitle";
import { APP_API } from "../../../httpClient/config";
import { httpClient } from "../../../httpClient/httpServices";
import NothingImg from "../../../image/bubbleNothing.jpg";
import { Book } from "../../../models/book";
import { appRoutes } from "../../../routers/config";

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
      <div className=" bg-white rounded-3 ">
        {/* {bookOfCategory(category.id)}; */}
        <PageTitle>Sách Yêu Thích</PageTitle>
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
        {myFavorBooks.length === 0 && (
          <div className="bg-white p-4 orderDetail-background-height d-flex justify-content-center align-items-center">
            <div>
              <img alt="bookimage" src={NothingImg} height="300" width="500" />
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
