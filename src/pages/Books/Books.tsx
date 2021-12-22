import { Card, Input, Pagination, Radio, RadioChangeEvent, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpClient } from "../../httpClient/httpServices";
import { Book } from "../../models/book";
import { appRoutes } from "../../routers/config";
import "./Books.css";

const DEFAULT_PAGE_SIZE = 30;

function Books() {
  const [bookArray, setBookArray] = useState<Book[]>([]);
  const navigate = useNavigate();
  const [value, setValue] = useState(2);
  const [curPage, setCurPage] = useState(1);
  const [showingBook, setShowingBook] = useState<Book[]>([]);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
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
    httpClient()
      .get("/books")
      .then((res) => {
        setBookArray([...res.data]);
        setShowingBook([...res.data.slice(0, DEFAULT_PAGE_SIZE)]);
      });
  }, []);

  return (
    <div className="d-flex bg-white pr-3">
      <div className="pt-5 mr-4 facet-list">
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={1}>Option A</Radio>
            <Radio value={2}>Option B</Radio>
            <Radio value={3}>Option C</Radio>
            <Radio value={4}>
              More...
              {value === 4 ? (
                <Input style={{ width: 100, marginLeft: 10 }} />
              ) : null}
            </Radio>
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
