import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Rate } from "antd";
import Meta from "antd/lib/card/Meta";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book, Category } from "../../models/book";
import { appRoutes } from "../../routers/config";
import BookCard from "./BookCard";

interface HomeCategoryProps {
  category: Category;
}

function HomeCategory({ category }: HomeCategoryProps) {
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
      {bookOfCate.length > 0 && (
        <div className=" bg-white rounded-3">
          {/* {bookOfCategory(category.id)}; */}
          <h4 className=" shoppingNow mt-2 mb-0 pt-4 pb-0">
            <FontAwesomeIcon
              className="mr-2"
              icon={faBookOpen}
              color="#CC99FF"
            />

            {category.nameCategory}
          </h4>

          <div className="home-book-list  pb-4">
            {bookOfCate.map((book: Book, index) => (
              <div>
                {index < 10 && (
                  <>
                    <BookCard book={book}></BookCard>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default HomeCategory;
