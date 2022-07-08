import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Rate } from "antd";
import Meta from "antd/lib/card/Meta";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book, Category } from "../../models/book";
import { EventBooksModel } from "../../models/EventBooks";
import { appRoutes } from "../../routers/config";

interface BookCardProps {
  bookEvent: EventBooksModel;
}

function BookCard({ bookEvent }: BookCardProps) {
  const navigate = useNavigate();
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });

    return newNumber;
  };
  useEffect(() => {}, [bookEvent]);

  return (
    <>
      <Card
        key={bookEvent.book.id}
        hoverable
        onClick={() => {
          navigate(
            appRoutes.bookDetail.replace(":id", bookEvent.book.id.toString())
          );
          window.scrollTo(0, 0);
        }}
        cover={
          <img
            className="home-preview-image"
            alt={bookEvent.book.nameBook}
            src={bookEvent.book.bookImages[0]?.image}
          />
        }
      >
        <Meta
          title={bookEvent.book.nameBook}
          description={
            <>
              <div
                style={{
                  display: "flex",
                  marginBottom: "0px",
                  alignItems: "end",
                }}
              >
                {bookEvent.discountPercentValue && (
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
                        bookEvent.book.price -
                          (bookEvent.book.price *
                            bookEvent.discountPercentValue) /
                            100
                      )}{" "}
                      ₫
                    </p>
                    <p className="discountt">
                      -{bookEvent.discountPercentValue}%
                    </p>
                  </>
                )}

                {bookEvent.discountValue && (
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
                        bookEvent.book.price - bookEvent.discountValue
                      )}
                      ₫
                    </p>
                    <p className="discountt">-{bookEvent.discountValue}đ</p>
                  </>
                )}
              </div>
              <div>
                <Rate
                  value={bookEvent.book.rating}
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
    </>
  );
}

export default BookCard;
