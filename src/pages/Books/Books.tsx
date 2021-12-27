import { Card, Pagination, Radio, RadioChangeEvent, Rate, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import Search from "antd/lib/input/Search";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageFooter from "../../components/Footer/Footer";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book } from "../../models/book";
import { Category } from "../../models/categoryBooks";
import { appRoutes } from "../../routers/config";
import "./Books.css";

const DEFAULT_PAGE_SIZE = 32;

function Books() {
  const [bookArray, setBookArray] = useState<Book[]>([]);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [priceValue, setPriceValue] = useState("all");
  const [curPage, setCurPage] = useState(1);
  const [showingBook, setShowingBook] = useState<Book[]>([]);
  const [categoryArray, setCategoryArray] = useState<Category[]>([]);
  const [categorySearch, setCategorySearch] = useState(0);
  const [keyWordSearch, setKeyWordSearch] = useState("");
  const [maxPriceSearch, setMaxPriceSearch] = useState(10000000);
  const [minPriceSearch, setMinPriceSearch] = useState(0);

  const onLoadBook = () => {
    httpClient()
      .get("/books")
      .then((res) => {
        console.log(res);
        setValue(0);
        setBookArray([...res.data]);
        console.log(bookArray);
        setShowingBook([...res.data.slice(0, DEFAULT_PAGE_SIZE)]);
      });
  };

  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);

    // if (e.target.value == 0) {
    //   onLoadBook();
    // } else {
    let bookSearch = {};
    setCategorySearch(parseInt(e.target.value));
    if (parseInt(e.target.value) == 0) {
      bookSearch = {
        idCategory: null,
        keyWord: keyWordSearch,
        minPrice: minPriceSearch,
        maxPrice: maxPriceSearch,
      };
    } else {
      bookSearch = {
        idCategory: parseInt(e.target.value),
        keyWord: keyWordSearch,
        minPrice: minPriceSearch,
        maxPrice: maxPriceSearch,
      };
    }

    console.log(bookSearch);
    setValue(e.target.value);
    httpClient()
      .post(APP_API.booksOfCate, bookSearch)
      .then((res) => {
        console.log(res);
        setBookArray([...res.data]);
        console.log(bookArray);
        setShowingBook([...res.data.slice(0, DEFAULT_PAGE_SIZE)]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onPriceChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    setPriceValue(e.target.value);
    let bookSearch = {};

    const priceSearch = (min: number, max: number, id: number, key: string) => {
      setMinPriceSearch(min);
      setMaxPriceSearch(max);

      if (value == 0) {
        bookSearch = {
          idCategory: null,
          keyWord: key,
          minPrice: min,
          maxPrice: max,
        };
      } else {
        bookSearch = {
          idCategory: id,
          keyWord: key,
          minPrice: min,
          maxPrice: max,
        };
      }
    };

    if (e.target.value == "all") {
      priceSearch(0, 10000000, categorySearch, "");
    } else if (e.target.value == "40") {
      priceSearch(0, 40000, categorySearch, "");
    } else if (e.target.value == "4070") {
      priceSearch(40000, 70000, categorySearch, "");
    } else if (e.target.value == "70100") {
      priceSearch(70000, 100000, categorySearch, "");
    } else if (e.target.value == "100150") {
      priceSearch(100000, 150000, categorySearch, "");
    } else if (e.target.value == "150") {
      priceSearch(150000, 10000000, categorySearch, "");
    }

    console.log(bookSearch);

    httpClient()
      .post(APP_API.booksOfCate, bookSearch)
      .then((res) => {
        console.log(res);
        setBookArray([...res.data]);
        console.log(bookArray);
        setShowingBook([...res.data.slice(0, DEFAULT_PAGE_SIZE)]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyWordSearch(e.target.value);
  };
  const onSearch = (key: string) => {
    let bookSearch = {};
    if (value == 0) {
      bookSearch = {
        idCategory: null,
        keyWord: key,
        minPrice: minPriceSearch,
        maxPrice: maxPriceSearch,
      };
    } else {
      bookSearch = {
        idCategory: categorySearch,
        keyWord: key,
        minPrice: minPriceSearch,
        maxPrice: maxPriceSearch,
      };
    }
    httpClient()
      .post(APP_API.booksOfCate, bookSearch)
      .then((res) => {
        console.log(res);
        setBookArray([...res.data]);
        console.log(bookArray);
        setShowingBook([...res.data.slice(0, DEFAULT_PAGE_SIZE)]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onCardClick = (id: string) => {
    navigate(appRoutes.bookDetail.replace(":id", id));
  };
  const onPageChange = (page: number, pageSize: number) => {
    setCurPage(page);
    setShowingBook([
      ...bookArray.slice((page - 1) * pageSize, page * pageSize),
    ]);
  };

  useEffect(() => {
    onLoadBook();
    httpClient()
      .get(APP_API.categoryBooks)
      .then((res) => {
        console.log(res);
        setCategoryArray([...res.data]);
        console.log(categoryArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="d-flex bg-white pr-3">
        <div>
          <div className="mt-5 mr-4 facet-list ">
            <Search
              placeholder="input search text"
              onChange={(e) => onKeyChange(e)}
              onSearch={() => onSearch(keyWordSearch)}
              style={{
                width: 230,
                borderBottom: "1px solid #efefef",
                paddingBottom: "20px",
              }}
            />
          </div>
          <div className="pt-5 mr-4 facet-list">
            <p className="font-cate-title"> Type of book:</p>
            <Radio.Group key="category" onChange={onChange} value={value}>
              <Space
                direction="vertical"
                style={{
                  gap: "0px",
                  borderBottom: "1px solid #efefef",
                  paddingBottom: "20px",
                }}
              >
                <Radio value={0} className="font-cate">
                  All Books
                </Radio>
                {categoryArray.length > 0 &&
                  categoryArray.map((category: Category) => (
                    <Radio value={category.id} className="font-cate">
                      {category.nameCategory}
                    </Radio>
                  ))}
              </Space>
            </Radio.Group>
          </div>
          <div className="pt-5 mr-4 facet-list">
            <p className="font-cate-title"> Prices:</p>
            <Radio.Group
              key="price"
              onChange={onPriceChange}
              value={priceValue}
            >
              <Space
                direction="vertical"
                style={{
                  gap: "0px",
                  borderBottom: "1px solid #efefef",
                  paddingBottom: "20px",
                }}
              >
                <Radio value="all" className="font-cate">
                  All Prices
                </Radio>
                <Radio value="40" className="font-cate">
                  Under 40.000đ
                </Radio>
                <Radio value="4070" className="font-cate">
                  40.000đ to 70.000đ
                </Radio>
                <Radio value="70100" className="font-cate">
                  70.000đ to 100.000đ
                </Radio>
                <Radio value="100150" className="font-cate">
                  100.000đ to 150.000đ
                </Radio>
                <Radio value="150" className="font-cate">
                  Above 150.000đ
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className="right-content">
          <div className="book-list">
            {showingBook.length > 0 &&
              showingBook.map((book: Book) => (
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
                                  paddingLeft: "5px",
                                  marginBottom: "0",
                                  fontSize: "12px",
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
          <div className="text-center">
            <Pagination
              className="p-3 mb-4"
              total={bookArray.length}
              onChange={onPageChange}
              defaultPageSize={DEFAULT_PAGE_SIZE}
              current={curPage}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
      <PageFooter></PageFooter>
    </>
  );
}

export default Books;
