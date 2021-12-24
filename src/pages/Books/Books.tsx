import { Card, Input, Pagination, Radio, RadioChangeEvent, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [value, setValue] = useState("all");
  const [curPage, setCurPage] = useState(1);
  const [showingBook, setShowingBook] = useState<Book[]>([]);
  const [categoryArray, setCategoryArray] = useState<Category[]>([]);

  const onLoadBook = () => {
    httpClient()
      .get("/books")
      .then((res) => {
        console.log(res);
        setValue("all");
        setBookArray([...res.data]);
        console.log(bookArray);
        setShowingBook([...res.data.slice(0, DEFAULT_PAGE_SIZE)]);
      });
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);

    if (e.target.value == "all") {
      onLoadBook();
    } else {
      const bookSearch = {
        idCategory: parseInt(e.target.value),
        keyWord: "",
      };
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
    }
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
    localStorage.setItem("breadcrumb", "List");
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
    <div className="d-flex bg-white pr-3">
      <div className="pt-5 mr-4 facet-list">
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={"all"} className="font-cate">
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
      <div className="right-content">
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
                <Meta title={book.nameBook} description={book.price + "đ"} />
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
  );
}

export default Books;
