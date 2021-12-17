import { Card, Input, Radio, RadioChangeEvent, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import { httpClient } from "../../httpClient/httpServices";
import { Book } from "../../models/book";
import "./HomePage.css";
import { appRoutes } from "../../routers/config";
import { Link } from "react-router-dom";

function HomePage() {
  const [bookArray, setBookArray] = useState<Book[]>([]);

  useEffect(() => {
    localStorage.setItem("breadcrumb", "List");
    httpClient()
      .get("/books")
      .then((res) => {
        setBookArray([...res.data]);
        console.log(bookArray);
        console.log(res);
      });
  }, []);

  const [value, setValue] = useState(2);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const onCardClick = (id: string) => {
    <Link to={appRoutes.bookDetail.replace(":id", id)} />;
  };

  return (
    <div className="cate-book">
      <div className="cate-list">
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
      <div className="book-list">
        {bookArray.length > 0 &&
          bookArray.map((book: Book) => (
            <Card
              key={book.id}
              hoverable
              //onClick={onCardClick(book.id.toString())}
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
    </div>
  );
}

export default HomePage;
