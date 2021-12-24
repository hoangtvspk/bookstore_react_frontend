import { Avatar, Button, Collapse, Comment, Rate } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { ChangeEvent, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book } from "../../models/book";
import { ReviewRep } from "../../models/reviewRep";
import { Review } from "../../models/reviews";
import { loadBookDetail } from "../../redux/slices/bookDetailSlice";
import "./BookDetail.css";
const { Panel } = Collapse;

const RenderReview = (reviews: any) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const book: Book = useSelector(
    (state: RootStateOrAny) => state.bookDetailSlice.value as Book
  );

  const [messageComment, setMassageComment] = useState("");

  const onRepCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMassageComment(e.target.value.toString());
  };

  const onSendRepComment = (reviewID: number) => {
    const repCommentValue = {
      reviewId: reviewID,
      message: messageComment,
    };
    httpClient()
      .post(APP_API.addReplyReview, repCommentValue)
      .then((res) => {
        dispatch(loadBookDetail(res.data));
        setMassageComment("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
                <Comment
                  author={
                    <>
                      <a style={{ fontSize: "14px" }}>
                        {review.user.firstName + " " + review.user.lastName}
                      </a>
                      <Rate
                        className="ml-2"
                        value={review.rating}
                        disabled
                      ></Rate>
                    </>
                  }
                  avatar={
                    <Avatar
                      src="https://joeschmoe.io/api/v1/random"
                      alt="Han Solo"
                    />
                  }
                  content={<p style={{ fontSize: "16px" }}>{review.message}</p>}
                >
                  <Collapse ghost>
                    <Panel
                      style={{ padding: "0 0" }}
                      header={
                        <u style={{ fontSize: "15px", color: "darkgrey" }}>
                          Reply{" "}
                          {review.reviewReps &&
                            "(" + review.reviewReps?.length + ")"}
                        </u>
                      }
                      key="1"
                    >
                      {review.reviewReps?.length > 0 &&
                        review.reviewReps.map((reviewRep: ReviewRep) => (
                          <div style={{ borderBottom: "1px solid #efefef" }}>
                            <Comment
                              author={
                                <a style={{ fontSize: "14px" }}>
                                  {reviewRep.user.firstName +
                                    " " +
                                    reviewRep.user.lastName}
                                </a>
                              }
                              avatar={
                                <Avatar
                                  src="https://joeschmoe.io/api/v1/random"
                                  alt="Han Solo"
                                />
                              }
                              content={
                                <p style={{ fontSize: "16px" }}>
                                  {reviewRep.message}
                                </p>
                              }
                            ></Comment>
                          </div>
                        ))}

                      <div style={{ marginBottom: "20px", marginTop: "5px" }}>
                        <div className="d-flex">
                          <p
                            style={{
                              marginBottom: "0px",
                              color: "darkgrey",
                              fontSize: "18px",
                              marginRight: "10px",
                            }}
                          >
                            You:
                          </p>
                          <TextArea
                            rows={1}
                            onChange={(e) => onRepCommentChange(e)}
                            value={messageComment}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            marginTop: "15px",
                          }}
                        >
                          <Button
                            style={{
                              backgroundColor: "orangered",
                              color: "white",
                              width: "100px",
                              height: "40px",
                              fontSize: "18px",
                            }}
                            onClick={() => onSendRepComment(review.id)}
                          >
                            Send
                          </Button>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </Comment>
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

  const [messageComment, setMassageComment] = useState("");
  const [rating, setRating] = useState(0);

  const onCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMassageComment(e.target.value.toString());
  };
  const onRatingChange = (e: number) => {
    setRating(e);
  };
  const onSendComment = () => {
    const commentValue = {
      bookId: id,
      message: messageComment,
      rating: rating,
    };
    httpClient()
      .post(APP_API.addReview, commentValue)
      .then((res) => {
        dispatch(loadBookDetail(res.data));
        setMassageComment("");
        setRating(0);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div
      className=" p-5 bg-white"
      style={{ marginTop: "25px", alignSelf: "end" }}
    >
      <h2>Books Ratings</h2>
      <div style={{ borderBottom: "3px solid #efefef" }}>
        <h4 className="book-rating">{book.rating?.toFixed(1)} out of 5</h4>

        <Rate
          style={{
            fontSize: "40px",
            color: "orangered",
          }}
          allowHalf
          value={book.rating}
          disabled
        />
      </div>
      {RenderReview(book.reviews)}
      <div>
        <div className="d-flex align-items-center">
          <p
            style={{
              marginBottom: "0px",
              marginRight: "30px",
              fontSize: "18px",
            }}
          >
            Do you love this book:{" "}
          </p>
          <Rate
            style={{
              fontSize: "40px",
              color: "orangered",
            }}
            onChange={(event) => onRatingChange(event)}
            value={rating}
          />
        </div>

        <TextArea
          rows={4}
          onChange={(e) => onCommentChange(e)}
          value={messageComment}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginTop: "15px",
          }}
        >
          <Button
            style={{
              backgroundColor: "orangered",
              color: "white",
              width: "100px",
              height: "40px",
              fontSize: "18px",
            }}
            onClick={() => onSendComment()}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
