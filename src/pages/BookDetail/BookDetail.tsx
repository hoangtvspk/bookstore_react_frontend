import { faCartPlus, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Carousel, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book } from "../../models/book";
import "./BookDetail.css";

function BookDetail() {
  const { id } = useParams();

  const [book, setBook] = useState({} as Book);

  const onChange = () => {};
  const [number, setNumber] = useState(1);

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

  useEffect(() => {
    console.log(id);
    if (id) {
      httpClient()
        .get(APP_API.bookDetail.replace(":id", id))
        .then((res) => {
          console.log(res);
          setBook(res.data);
          console.log(book);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const onFinish = (id: string, number: string) => {
    console.log(id, number);
    const formData = new FormData();
    formData.append("idBook", id);
    formData.append("quantity", number);
    httpClient()
      .post(APP_API.addToCart, formData, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        message.success("Thêm vào giỏ hàng thành công");
      })
      .catch((err) => {
        console.log(err);
        message.error("Thêm thất bại");
      });
  };

  return (
    <div>
      <div className="d-flex p-5 bg-white">
        <Carousel afterChange={onChange} className="book-images mr-5">
          {Object.entries(book).length > 0 && (
            <ImageGallery
              showPlayButton={false}
              items={book.bookImages.map((img) => {
                return { original: img.image };
              })}
            ></ImageGallery>
          )}
        </Carousel>
        <div>
          {/* <p style={{ fontSize: "18px", marginBottom: "0px" }}>
            Thể loại: {book.category.nameCategory}
          </p> */}
          <h2>{book.nameBook}</h2>
          <p style={{ fontSize: "16px" }}>Tác Giả: {book.author}</p>
          <div
            style={{
              paddingTop: "80px",
              display: "flex",
            }}
          >
            <h1 style={{ color: "rgb(255, 66, 78)" }}>
              {book.price - (book.price * book.discount) / 100} ₫
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
                  {book.price} ₫
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
              ></Input>
              <Button className="quantity-btn" onClick={onIncrease}>
                <FontAwesomeIcon className="mr-2" icon={faPlus} />
              </Button>
            </div>
          </div>
          <Button
            htmlType="submit"
            className="btn-submit"
            onClick={() => onFinish(id || "", number.toString())}
          >
            <FontAwesomeIcon className="mr-2" icon={faCartPlus} />
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
      <div className=" p-5 bg-white" style={{ marginTop: "25px" }}>
        <h2>Mô tả sản phẩm</h2>
        <p style={{ fontSize: "20px" }}>{book.detail}</p>
      </div>
    </div>
  );
}

export default BookDetail;
