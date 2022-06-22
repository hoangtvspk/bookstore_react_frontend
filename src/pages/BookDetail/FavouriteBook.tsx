import { Book, BookImage, Category } from "../../models/book";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Card, Image, Rate, Comment, message } from "antd";
import Meta from "antd/lib/card/Meta";
import { httpClient } from "../../httpClient/httpServices";
import { APP_API } from "../../httpClient/config";
import { updateKeySearch } from "../../redux/slices/keySearchSlice";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../routers/config";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

interface BookProps {
  book: Book;
}

function FavouriteBook({ book }: BookProps) {
  const [isLoved, setIsLoved] = useState(false);
  const isFavor = (bookF: Book) => {
    bookF.id = book.id;
  };
  const getFavorBooks = () => {
    httpClient()
      .get(APP_API.getMyFavor)
      .then((res) => {
        let check = 0;
        res?.data.map((favorBook: Book) => {
          if (favorBook.id == book.id) {
            check++;
          }
        });
        if (check != 0) {
          setIsLoved(true);
          console.log(isLoved);
        } else setIsLoved(false);
      })
      .catch((err) => {})
      .finally(() => {});
  };
  const addToFavorBooks = () => {
    httpClient()
      .put(APP_API.addToFavor.replace(":id", book.id.toString()), book)
      .then((res) => {
        setIsLoved(true);
        message.success("Đã thêm vào yêu thích!");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  const removeFromFavorBooks = () => {
    httpClient()
      .delete(APP_API.unFavor.replace(":id", book.id.toString()))
      .then((res) => {
        setIsLoved(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  useEffect(() => {
    getFavorBooks();
    console.log(isLoved);
  }, [book.id]);

  return (
    <>
      <div style={{ marginLeft: "15vw" }}>
        {/* <img src={image.image} className="list-image"></img> */}
        {!isLoved && (
          <HeartOutlined
            onClick={() => {
              addToFavorBooks();
            }}
            className="d-flex justify-content-center"
            style={{
              fontSize: "30px",

              color: "#FF6666",
            }}
          />
        )}
        {isLoved && (
          <HeartFilled
            onClick={() => {
              removeFromFavorBooks();
            }}
            className="d-flex justify-content-center"
            style={{
              fontSize: "30px",

              color: "#FF6666",
            }}
          />
        )}
        <p className="d-flex justify-content-center">Yêu Thích</p>
      </div>
    </>
  );
}

export default FavouriteBook;
