import { faCommentAlt, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Rate } from "antd";
import { ChangeEvent, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { UserInfo } from "../../models/auth";
import { Book } from "../../models/book";
import { Review } from "../../models/reviews";
import { loadBookDetail } from "../../redux/slices/bookDetailSlice";
import "./BookDetail.css";
import CommentBox from "./CommentBox";

const RenderReview = (reviews: any) => {
  console.log(reviews);
  return (
    <div>
      {reviews && (
        <>
          {reviews.length > 0 &&
            reviews.map((review: Review) => (
              <div
                key={review.id}
                style={{ borderBottom: "1px solid #efefef" }}
              >
                <CommentBox review={review}></CommentBox>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

function Reviews() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const book: Book = useSelector(
    (state: RootStateOrAny) => state.bookDetailSlice.value as Book
  );
  const userInfo = useSelector(
    (state: RootStateOrAny) => state.authSlice.userInfo as UserInfo
  );
  const [messageComment, setMassageComment] = useState("");
  const [rating, setRating] = useState(0);

  const onCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMassageComment(e.target.value.toString());
  };
  const onRatingChange = (e: number) => {
    setRating(e);
  };
  const onSendComment = () => {
    const review = {
      bookId: id,
      message: messageComment,
      rating: rating,
    };
    const formData: FormData = new FormData();
    formData.append(
      "review",
      new Blob([JSON.stringify(review)], { type: "application/json" })
    );
    for (let i = 0; i < images.length; i++) {
      console.log(images[i]);
      formData.append("files", images[i].file as string | Blob);
    }
    console.log(new Blob([JSON.stringify("")], { type: "application/json" }));
    httpClient()
      .post(APP_API.addReview, formData, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(loadBookDetail(res.data));
        setMassageComment("");
        setRating(0);
        setImages([] as ImageListType);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const [images, setImages] = useState([] as ImageListType);
  const maxNumber = 69;
  const imageList2 = [];
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    for (let i = 0; i < imageList.length; i++) {
      imageList2.push(imageList[i].file);
    }
    setImages(imageList);
    // setFile1(imageList[0].file);
  };
  const isAuth = useSelector((state: RootStateOrAny) => {
    return state.authSlice.isAuth;
  });
  return (
    <div
      className=" p-5 bg-white pt-4"
      style={{ marginTop: "25px", alignSelf: "end" }}
    >
      <p
        style={{
          color: "#555555",
          fontSize: "22px",
          fontWeight: 400,
          marginBottom: 0,
        }}
      >
        <FontAwesomeIcon className="mr-2" icon={faCommentAlt} color="#FFCC99" />
        Đánh Giá Từ Độc Giả
      </p>
      <div style={{ borderBottom: "3px solid #efefef" }}>
        <div className="d-flex align-items-end">
          <Rate
            style={{
              fontSize: "35px",
              color: "#FFCC99",
            }}
            allowHalf
            value={book.rating}
            disabled
          />
          {book.reviews && (
            <p
              style={{
                marginLeft: "20px",
                marginBottom: "0",
                fontSize: "20px",
                color: "darkgrey",
              }}
            >
              ({book.reviews.length} lượt đánh giá)
            </p>
          )}
        </div>
      </div>
      {RenderReview(book.reviews)}
      <div>
        {isAuth && (
          <>
            <div className="d-flex align-items-center">
              <p
                style={{
                  marginBottom: "0px",
                  marginRight: "30px",
                  fontSize: "18px",
                }}
              >
                Cảm Nhận Của Bạn Về Cuốn Sách Này:{" "}
              </p>
              <Rate
                style={{
                  fontSize: "40px",
                }}
                onChange={(event) => onRatingChange(event)}
                value={rating}
              />
            </div>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
            >
              {({
                imageList,
                onImageUpload,

                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <>
                  <Input.Group compact>
                    {/* </div> */}
                    <img
                      src={userInfo!.image}
                      height={30}
                      width={30}
                      style={{ borderRadius: "50%", marginRight: 15 }}
                    ></img>
                    <Input
                      style={{ width: "calc(100% - 150px)" }}
                      onChange={(e) => onCommentChange(e)}
                      value={messageComment}
                    />
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "white",
                        paddingRight: 0,
                        paddingLeft: 10,
                        border: "1px solid #d9d9d9",
                        boxShadow: "unset",
                      }}
                      onClick={onImageUpload}
                    >
                      {" "}
                      <FontAwesomeIcon
                        className="mr-2"
                        icon={faLink}
                        color="#DDDDDD"
                      ></FontAwesomeIcon>
                    </Button>
                    <Button type="primary" onClick={() => onSendComment()}>
                      Gửi
                    </Button>
                  </Input.Group>

                  <div className="upload__image-wrapper d-flex ">
                    {imageList!.map((image, index) => (
                      <div key={index} className="image-item mt-2 mr-2">
                        <img
                          src={image.dataURL}
                          alt=""
                          width="100"
                          height={100}
                          style={{ objectFit: "cover" }}
                        />
                        <div className="image-item__btn-wrapper">
                          <Button onClick={() => onImageRemove(index)}>
                            Xóa
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </ImageUploading>
          </>
        )}
      </div>
    </div>
  );
}

export default Reviews;
