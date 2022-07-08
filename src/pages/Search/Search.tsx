import {
  Button,
  Card,
  Pagination,
  Radio,
  RadioChangeEvent,
  Rate,
  Space,
} from "antd";
import Meta from "antd/lib/card/Meta";
import Search from "antd/lib/input/Search";
import { ChangeEvent, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book } from "../../models/book";
import { Category } from "../../models/categoryBooks";
import { updateKeySearch } from "../../redux/slices/keySearchSlice";
import { appRoutes } from "../../routers/config";
import BookCard from "../HomePage/BookCard";
import "./Search.css";

const DEFAULT_PAGE_SIZE = 32;

function SearchPage() {
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

  const booksSearch = useSelector((state: RootStateOrAny) => {
    return state.keySearchSlice.booksSearch;
  });

  const dispatch = useDispatch();

  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    return newNumber;
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    if (booksSearch.keyWord != null) {
      dispatch(
        updateKeySearch({
          idCategory: e.target.value,
          keyWord: booksSearch.keyWord,
          minPrice: 0,
          maxPrice: 100000000,
        })
      );
      setValue(booksSearch.idCategory);
      console.log(booksSearch.keyWord);
      let bookSearch = {};
      setCategorySearch(parseInt(e.target.value));
      if (e.target.value === 0) {
        dispatch(
          updateKeySearch({
            idCategory: null,
            keyWord: booksSearch.keyWord,
            minPrice: 0,
            maxPrice: 100000000,
          })
        );
        bookSearch = {
          idCategory: null,
          keyWord: booksSearch.keyWord,
          minPrice: minPriceSearch,
          maxPrice: maxPriceSearch,
        };
      } else {
        bookSearch = {
          idCategory: parseInt(e.target.value),
          keyWord: booksSearch.keyWord,
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
    }
    // if (e.target.value == 0) {
    //   onLoadBook();
    // } else {
  };
  const onPriceChange = (e: RadioChangeEvent) => {
    if (booksSearch.keyWord != null) {
      console.log(e.target.value);
      setPriceValue(e.target.value);
      let bookSearch = {};

      const priceSearch = (
        min: number,
        max: number,
        id: number,
        key: string
      ) => {
        setMinPriceSearch(min);
        setMaxPriceSearch(max);

        if (value === 0) {
          bookSearch = {
            idCategory: null,
            keyWord: booksSearch.keyWord,
            minPrice: min,
            maxPrice: max,
          };
        } else {
          bookSearch = {
            idCategory: id,
            keyWord: booksSearch.keyWord,
            minPrice: min,
            maxPrice: max,
          };
        }
      };

      if (e.target.value === "all") {
        priceSearch(0, 10000000, categorySearch, "");
      } else if (e.target.value === "40") {
        priceSearch(0, 40000, categorySearch, "");
      } else if (e.target.value === "4070") {
        priceSearch(40000, 70000, categorySearch, "");
      } else if (e.target.value === "70100") {
        priceSearch(70000, 100000, categorySearch, "");
      } else if (e.target.value === "100150") {
        priceSearch(100000, 150000, categorySearch, "");
      } else if (e.target.value === "150") {
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
    }
  };

  const onSearch = () => {
    console.log(keyWordSearch);
    if (booksSearch.keyWord != null) {
      console.log(booksSearch);
      if (booksSearch.idCategory == null) setValue(0);
      else {
        setValue(booksSearch.idCategory);
      }
      //setValue(booksSearch.idCategory);
      setCategorySearch(booksSearch.idCategory);
      let bookSearch = {};
      if (value == 0 && booksSearch.idCategory != null) {
        bookSearch = {
          idCategory: booksSearch.idCategory,
          keyWord: booksSearch.keyWord,
          minPrice: minPriceSearch,
          maxPrice: maxPriceSearch,
        };
      } else if (value == 0 && booksSearch.idCategory == null) {
        bookSearch = {
          idCategory: null,
          keyWord: booksSearch.keyWord,
          minPrice: minPriceSearch,
          maxPrice: maxPriceSearch,
        };
      } else {
        bookSearch = {
          idCategory: booksSearch.idCategory,
          keyWord: booksSearch.keyWord,
          minPrice: minPriceSearch,
          maxPrice: maxPriceSearch,
        };
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
    }
  };

  const onPageChange = (page: number, pageSize: number) => {
    console.log(booksSearch);
    setCurPage(page);
    setShowingBook([
      ...bookArray.slice((page - 1) * pageSize, page * pageSize),
    ]);
  };
  const onKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (booksSearch.keyWord != null) {
      setKeyWordSearch(e.target.value);
      console.log(booksSearch);
      dispatch(
        updateKeySearch({
          idCategory: booksSearch.idCategory,
          keyWord: e.target.value,
          minPrice: 0,
          maxPrice: 100000000,
        })
      );
    }
  };
  // const [_, setSearchParams] = useSearchParams();
  useEffect(() => {
    onSearch();
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
  }, [booksSearch]);

  return (
    <>
      <div className="d-flex bg-white pr-3 rounded-3">
        <div>
          <div className="pt-5 mr-2 facet-list">
            <div style={{ paddingRight: "10px" }} className="mb-4">
              <Search
                placeholder="Tìm kiếm..."
                onChange={onKeyChange}
                onSearch={() => {
                  if (booksSearch.keyWord != null) {
                    dispatch(
                      updateKeySearch({
                        idCategory: booksSearch.idCategory,
                        keyWord: keyWordSearch,
                        minPrice: 0,
                        maxPrice: 100000000,
                      })
                    );
                  }

                  navigate(appRoutes.books);
                  window.scrollTo(0, 0);
                }}
                className="bg-transparent mr-6"
              />
            </div>

            <p className="font-cate-title">Thể Loại:</p>
            <Radio.Group key="category" onChange={onChange} value={value}>
              <Space
                direction="vertical"
                style={{
                  gap: "1px",
                  borderBottom: "1px solid #efefef",
                  paddingBottom: "10px",
                }}
              >
                <Radio value={0} className="font-cate">
                  Tất cả
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
          <div className="pt-1 mr-2 facet-list">
            <p className="font-cate-title">Giá:</p>
            <Radio.Group
              key="price"
              onChange={onPriceChange}
              value={priceValue}
            >
              <Space
                direction="vertical"
                style={{
                  gap: "1px",
                  borderBottom: "1px solid #efefef",
                  paddingBottom: "20px",
                }}
              >
                <Radio value="all" className="font-cate">
                  Tất cả
                </Radio>
                <Radio value="40" className="font-cate">
                  Dưới 40.000đ
                </Radio>
                <Radio value="4070" className="font-cate">
                  40.000đ tới 70.000đ
                </Radio>
                <Radio value="70100" className="font-cate">
                  70.000đ tới 100.000đ
                </Radio>
                <Radio value="100150" className="font-cate">
                  100.000đ tới 150.000đ
                </Radio>
                <Radio value="150" className="font-cate">
                  Trên 150.000đ
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className="right-content">
          <div className="book-list">
            {showingBook.length > 0 &&
              showingBook.map((book: Book) => (
                <BookCard book={book}></BookCard>
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
    </>
  );
}

export default SearchPage;
