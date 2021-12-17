import { Card, Form, Input, Radio, RadioChangeEvent, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpClient } from "../../httpClient/httpServices";
import { Book } from "../../models/book";
import "./BookDetail.css";
import { APP_API } from "../../httpClient/config";
import { useForm } from "antd/lib/form/Form";

function BookDetail() {
  const { id } = useParams();
  const [bookForm] = useForm();

  const [book, setBook] = useState({} as Book);

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
  }, []);

  return (
    <div className="cate-book">
      <div className="cate-list">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          className=""
          form={bookForm}
        >
          <Form.Item
            label="Book Name"
            name="nameBook"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="w-100" />
          </Form.Item>
        </Form>
      </div>
      <div className="book-list"></div>
    </div>
  );
}

export default BookDetail;
