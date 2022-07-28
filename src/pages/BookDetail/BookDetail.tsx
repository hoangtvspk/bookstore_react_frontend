import {
  faBookOpen,
  faCartPlus,
  faMinus,
  faPenAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Carousel, Divider, Input, message, Rate } from "antd";
import Meta from "antd/lib/card/Meta";
import { ChangeEvent, useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book, BookImage } from "../../models/book";
import { loadBookDetail } from "../../redux/slices/bookDetailSlice";
import { updateCartData } from "../../redux/slices/cartSlice";
import { appRoutes } from "../../routers/config";
import BookCard from "../HomePage/BookCard";
import "./BookDetail.css";
import FavouriteBook from "./FavouriteBook";
import ImageList from "./ImageList";
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
      console.log(book.nameBook);
      setNumber(number + 1);
    }
  };
  const onDecrease = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
  };

  const onUpdateQuantity = (quantity: ChangeEvent<HTMLInputElement>) => {
    setNumber(parseInt(quantity.target.value));
  };
  const onCardClick = (id: string) => {
    navigate(appRoutes.bookDetail.replace(":id", id));
    window.scrollTo(0, 0);
    setNumber(1);
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
    onLoad();
  }, [id]);
  const onLoad = () => {
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
  };

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
    navigate(appRoutes.bookDetail.replace(":id", id));
    if (!isLoggedIn) {
      navigate(appRoutes.login);
      message.warn("Đăng Nhập Để Tiếp Tục");
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
      <div className="d-flex p-5 bg-white" style={{ paddingLeft: "100" }}>
        <div className="mr-3">
          {/* <Image src={book.bookImages[0].image} height={100} /> */}

          {book.bookImages?.map((img: BookImage) => (
            <ImageList image={img}></ImageList>
          ))}
        </div>
        <div className="book-images mr-5">
          <Carousel afterChange={onChange}>
            {Object.entries(book).length > 0 && (
              <ImageGallery
                autoPlay
                showPlayButton={false}
                items={book.bookImages.map((img: BookImage) => {
                  return { original: img.image };
                })}
              ></ImageGallery>
            )}
          </Carousel>
        </div>
        <div>
          <div className="d-flex ">
            <p
              style={{
                color: "#555555",
                fontSize: "26px",
                fontWeight: 400,
                marginBottom: 0,
                width: "350px",
              }}
            >
              {book.nameBook}
            </p>
            <FavouriteBook book={book}></FavouriteBook>
          </div>
          <div className="d-flex align-justify-content-xl-end">
            <Rate
              style={{
                fontSize: "20px",
                color: "#FFCC00",
                paddingRight: 10,
              }}
              allowHalf
              value={book.rating}
              disabled
            />
            {book.reviews && (
              <p
                style={{
                  fontSize: "16px",
                  alignSelf: "end",
                  marginBottom: 0,
                  color: "#FFCC00",
                }}
              >
                ({book.reviews.length} đánh giá)
              </p>
            )}
          </div>
          {book.category && (
            <p style={{ fontSize: "16px", marginBottom: "0px" }}>
              Thể Loại: {book.category.nameCategory}
            </p>
          )}
          <div
            style={{
              fontSize: "16px",
              color: "#008dff",
              display: "flex",
            }}
          >
            <p style={{ fontSize: "16px", color: "black" }}>Tác Giả:&nbsp;</p>
            {book.author}
          </div>

          <div
            style={{
              paddingTop: "50px",
              display: "flex",
            }}
          >
            {book.bookForEvents?.length < 1 && (
              <>
                <h2 style={{ color: "rgb(255, 66, 78)" }}>
                  {stringPrice(book.price - (book.price * book.discount) / 100)}
                  ₫
                </h2>
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
              </>
            )}
            {book.bookForEvents?.length > 0 && (
              <>
                {book.bookForEvents[0].discountPercentValue && (
                  <>
                    <h2 style={{ color: "rgb(255, 66, 78)" }}>
                      {stringPrice(
                        book.price -
                          (book.price *
                            book.bookForEvents[0].discountPercentValue) /
                            100
                      )}{" "}
                      ₫
                    </h2>
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
                    <p className="discount">
                      -{book.bookForEvents[0].discountPercentValue}%
                    </p>
                  </>
                )}

                {book.bookForEvents[0].discountValue && (
                  <>
                    <h2 style={{ color: "rgb(255, 66, 78)" }}>
                      {stringPrice(
                        book.price - book.bookForEvents[0].discountValue
                      )}
                      ₫
                    </h2>
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
                    <p className="discount">
                      -{book.bookForEvents[0].discountValue}đ
                    </p>
                  </>
                )}
              </>
            )}
          </div>
          <div>
            <p
              style={{
                marginBottom: 0,
                fontSize: "16px",
                paddingTop: "60px",
                fontWeight: "500",
                color: "#555555",
                paddingBottom: "10px",
              }}
            >
              Số Lượng:
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
                      fontSize: "16px",
                    }}
                  >
                    (Còn lại {book.quantity} cuốn)
                  </p>
                </div>
                <Button
                  htmlType="submit"
                  className="btn-submit"
                  onClick={() => onFinish(id || "", number.toString())}
                >
                  <FontAwesomeIcon className="mr-2" icon={faCartPlus} />
                  Thêm Vào Giỏ Hàng
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
                      fontSize: "16px",
                    }}
                  >
                    (Hết hàng)
                  </p>
                </div>
                <Button
                  htmlType="submit"
                  className="btn-submit-disable"
                  disabled
                >
                  <FontAwesomeIcon className="mr-2" icon={faCartPlus} />
                  Thêm Vào Giỏ Hàng
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className=" p-5 bg-white pt-4"
        style={{ marginTop: "15px", alignSelf: "end" }}
      >
        <p
          style={{
            color: "#555555",
            fontSize: "24px",
            fontWeight: 400,
            marginBottom: 0,
          }}
        >
          <FontAwesomeIcon className="mr-2" icon={faPenAlt} color="#FF6633" />
          Mô Tả Sản Phẩm
        </p>
        <Divider></Divider>
        <p style={{ fontSize: "18px" }}>{book.detail}</p>
      </div>
      <div className="p-5 bg-white pt-4 " style={{ marginTop: "15px" }}>
        <p
          style={{
            color: "#555555",
            fontSize: "24px",
            fontWeight: 400,
            marginBottom: 0,
          }}
        >
          <FontAwesomeIcon className="mr-2" icon={faBookOpen} color="#0099FF" />
          Sản Phẩm Tương Tự
        </p>
        <Divider></Divider>
        <div className="related-book-list">
          {bookArray.length > 0 &&
            bookArray
              .slice()
              .reverse()
              .map(
                (book: Book, index) =>
                  book.id.toString() != id &&
                  index < 10 && (
                    <Card
                      key={book.id}
                      hoverable
                      bordered
                      onClick={() => {
                        navigate(
                          appRoutes.bookDetail.replace(
                            ":id",
                            book.id.toString()
                          )
                        );
                        window.scrollTo(0, 0);
                        setNumber(1);
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
                              {book.bookForEvents.length < 1 && (
                                <>
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
                                </>
                              )}
                              {book.bookForEvents.length > 0 && (
                                <>
                                  {book.bookForEvents[0]
                                    .discountPercentValue && (
                                    <>
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
                                            (book.price *
                                              book.bookForEvents[0]
                                                .discountPercentValue) /
                                              100
                                        )}{" "}
                                        ₫
                                      </p>
                                      <p className="discountt">
                                        -
                                        {
                                          book.bookForEvents[0]
                                            .discountPercentValue
                                        }
                                        %
                                      </p>
                                    </>
                                  )}

                                  {book.bookForEvents[0].discountValue && (
                                    <>
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
                                            book.bookForEvents[0].discountValue
                                        )}
                                        ₫
                                      </p>
                                      <p className="discountt">
                                        -{book.bookForEvents[0].discountValue}đ
                                      </p>
                                    </>
                                  )}
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
                  )
              )}
        </div>
      </div>

      <Reviews />
    </div>
  );
}

export default BookDetail;
