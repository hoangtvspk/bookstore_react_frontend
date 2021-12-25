import { faCartPlus, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Carousel, Input, message, Rate } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { ChangeEvent, useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PageFooter from "../../components/Footer/Footer";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book, BookImage } from "../../models/book";
import { loadBookDetail } from "../../redux/slices/bookDetailSlice";
import { updateCartData } from "../../redux/slices/cartSlice";
import { appRoutes } from "../../routers/config";
import "./BookDetail.css";
import Reviews from "./Reviews";

function BookDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const book = useSelector(
    (state: RootStateOrAny) => state.bookDetailSlice.value
  );

  const onChange = () => {};
  const [number, setNumber] = useState(1);
  const [bookArray, setBookArray] = useState<Book[]>([]);
  const navigate = useNavigate();

  const onIncrease = () => {
    if (number < book.quantity) {
      setNumber(number + 1);
    }
  };
  const onDecrease = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
  };
  const Cart = new Array();

  const onUpdateQuantity = (quantity: ChangeEvent<HTMLInputElement>) => {
    setNumber(parseInt(quantity.target.value));
  };
  const onCardClick = (id: string) => {
    navigate(appRoutes.bookDetail.replace(":id", id));
  };

  const isLoggedIn = useSelector((state: RootStateOrAny) => {
    return state.authSlice.isAuth;
  });

  const relatedbook = (catId: string) => {
    httpClient()
      .get(APP_API.relatedBooks.replace(":id", catId))
      .then((res) => {
        setBookArray(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (id) {
      httpClient()
        .get(APP_API.bookDetail.replace(":id", id))
        .then((res) => {
          const bookData = res.data as Book;
          dispatch(loadBookDetail(bookData));
          relatedbook(bookData.category.id.toString());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };

  const onFinish = (id: string, number: string) => {
    const formData: FormData = new FormData();
    formData.append(
      "idBook",
      new Blob([JSON.stringify({ id })], { type: "application/json" })
    );

    formData.append(
      "quantity",
      new Blob([JSON.stringify({ number })], { type: "application/json" })
    );

    if (!isLoggedIn) {
      const localCartArray = JSON.parse(
        localStorage.getItem("noAuthCart") || "[]"
      );
      localCartArray.push({ id: id, quantity: number });
      localStorage.setItem("noAuthCart", JSON.stringify(localCartArray));
      message.success("Thêm vào thành công");
    }
    if (isLoggedIn) {
      httpClient()
        .post(APP_API.addToCart, formData, {
          headers: {
            Authorization: localStorage.getItem("token") || "",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          message.success("Thêm vào giỏ hàng thành công");
          dispatch(updateCartData(res.data));
        })
        .catch((err) => {
          console.error(err);
          message.error("Thêm thất bại");
          setNumber(1);
        });
    }
  };

  return (
    <div>
      <div className="d-flex p-5 bg-white">
        <Carousel afterChange={onChange} className="book-images mr-5">
          {Object.entries(book).length > 0 && (
            <ImageGallery
              showPlayButton={false}
              items={book.bookImages.map((img: BookImage) => {
                return { original: img.image };
              })}
            ></ImageGallery>
          )}
        </Carousel>
        <div>
          {book.category && (
            <p style={{ fontSize: "18px", marginBottom: "0px" }}>
              Thể loại: {book.category.nameCategory}
            </p>
          )}

          <h2>{book.nameBook}</h2>
          <p style={{ fontSize: "16px" }}>Tác Giả: {book.author}</p>
          <div
            style={{
              paddingTop: "80px",
              display: "flex",
            }}
          >
            <h1 style={{ color: "rgb(255, 66, 78)" }}>
              {stringPrice(book.price - (book.price * book.discount) / 100)} ₫
            </h1>
            {book.discount > 0 && (
              <>
                <p
                  style={{
                    color: "rgb(128, 128, 137) ",
                    alignSelf: "end",
                    fontSize: "16px",
                    textDecoration: "line-through",
                    paddingLeft: "8px",
                  }}
                >
                  {stringPrice(book.price)} ₫
                </p>
                <p className="discount">-{book.discount}%</p>
              </>
            )}
          </div>
          <div>
            <p
              style={{
                marginBottom: 0,
                fontSize: "18px",
                paddingTop: "100px",
              }}
            >
              Số lượng
            </p>

            {book.quantity > 0 && (
              <>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Button className="quantity-btn" onClick={onDecrease}>
                    <FontAwesomeIcon className="mr-2" icon={faMinus} />
                  </Button>
                  <Input
                    className="quantity-input"
                    value={number}
                    width="300px"
                    onChange={(event) => onUpdateQuantity(event)}
                  ></Input>
                  <Button className="quantity-btn" onClick={onIncrease}>
                    <FontAwesomeIcon className="mr-2" icon={faPlus} />
                  </Button>
                  <p
                    style={{
                      marginBottom: "0px",
                      alignSelf: "end",
                      color: "red",
                      marginLeft: "10px",
                      fontSize: "18px",
                    }}
                  >
                    Còn lại {book.quantity} cuốn
                  </p>
                </div>
                <Button
                  htmlType="submit"
                  className="btn-submit"
                  onClick={() => onFinish(id || "", number.toString())}
                >
                  <FontAwesomeIcon className="mr-2" icon={faCartPlus} />
                  Thêm vào giỏ hàng
                </Button>
              </>
            )}
            {book.quantity < 1 && (
              <>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Button className="quantity-btn" onClick={onDecrease}>
                    <FontAwesomeIcon className="mr-2" icon={faMinus} />
                  </Button>
                  <Input
                    className="quantity-input"
                    value="0"
                    width="300px"
                    disabled
                  ></Input>
                  <Button className="quantity-btn" onClick={onIncrease}>
                    <FontAwesomeIcon className="mr-2" icon={faPlus} />
                  </Button>
                  <p
                    style={{
                      marginBottom: "0px",
                      alignSelf: "end",
                      color: "red",
                      marginLeft: "10px",
                      fontSize: "18px",
                    }}
                  >
                    (Tạm Hết Hàng)
                  </p>
                </div>
                <Button
                  htmlType="submit"
                  className="btn-submit-disable"
                  disabled
                >
                  <FontAwesomeIcon className="mr-2" icon={faCartPlus} />
                  Thêm vào giỏ hàng
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className=" p-5 bg-white"
        style={{ marginTop: "25px", alignSelf: "end" }}
      >
        <h2>Book Description</h2>
        <p style={{ fontSize: "20px" }}>{book.detail}</p>
      </div>
      <div className="p-5 bg-white " style={{ marginTop: "25px" }}>
        <h2>Related Book</h2>
        <div className="book-list">
          {bookArray.length > 0 &&
            bookArray.map((book: Book) => (
              <Card
                key={book.id}
                hoverable
                onClick={() => onCardClick(book.id.toString())}
                cover={
                  <img
                    className="preview-image"
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
                            book.price - (book.price * book.discount) / 100
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
                            <p className="discountt">-{book.discount}%</p>
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

      <Reviews />
      <PageFooter></PageFooter>
    </div>
  );
}

export default BookDetail;
