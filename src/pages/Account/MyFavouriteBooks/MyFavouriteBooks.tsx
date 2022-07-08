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
import BookCard from "../../HomePage/BookCard";

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
      <div
        className=" bg-white rounded-3 "
        style={{ minHeight: "calc(100vh - 200px)" }}
      >
        {/* {bookOfCategory(category.id)}; */}
        <PageTitle>Sách Yêu Thích</PageTitle>
        <div className="home-book-list  pb-4">
          {myFavorBooks?.length > 0 &&
            myFavorBooks?.map((book: Book, index) => (
              <div>{index < 10 && <BookCard book={book}></BookCard>}</div>
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
