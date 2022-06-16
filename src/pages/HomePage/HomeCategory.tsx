import { Book, Category } from "../../models/book";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Card, Rate } from "antd";
import Meta from "antd/lib/card/Meta";
import { httpClient } from "../../httpClient/httpServices";
import { APP_API } from "../../httpClient/config";
import { updateKeySearch } from "../../redux/slices/keySearchSlice";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../routers/config";

interface HomeCategoryProps {
  category: Category;
}

function HomeCategory({ category }: HomeCategoryProps) {
  const booksSearch = useSelector((state: RootStateOrAny) => {
    return state.keySearchSlice.booksSearch;
  });
  const dispatch = useDispatch();
  const [bookOfCate, setBookOfCate] = useState<Book[]>([]);
  const navigate = useNavigate();
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };
  const fetchCategoryBooks = (categoryId: number) => {
    console.log(category);

    let bookSearch = {
      idCategory: categoryId,
      keyWord: "",
      minPrice: "",
      maxPrice: "",
    };
    httpClient()
      .post(APP_API.booksOfCate, bookSearch)
      .then((res) => {
        console.log(res.data);
        setBookOfCate([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (category.id) {
      fetchCategoryBooks(category.id);
    }
  }, [category.id]);

  return (
    <>
      <div className=" bg-white rounded-3">
        {/* {bookOfCategory(category.id)}; */}
        <h4 className=" shoppingNow mt-2 mb-0 pt-4 pb-0">
          <FontAwesomeIcon className="mr-2" icon={faBookOpen} color="#CC99FF" />

          {category.nameCategory}
        </h4>

        <div className="home-book-list  pb-4">
          {bookOfCate.length > 0 &&
            bookOfCate.map((book: Book, index) => (
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
      </div>
    </>
  );
}

export default HomeCategory;
