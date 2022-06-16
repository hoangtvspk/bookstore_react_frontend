import { Book, Category } from "../../models/book";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  Card,
  Rate,
  Comment,
  Collapse,
  Button,
  Input,
  Image,
} from "antd";
import Meta from "antd/lib/card/Meta";
import { httpClient } from "../../httpClient/httpServices";
import { APP_API } from "../../httpClient/config";
import { updateKeySearch } from "../../redux/slices/keySearchSlice";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../routers/config";
import { Review } from "../../models/reviews";
import { ReviewRep } from "../../models/reviewRep";
import TextArea from "antd/lib/input/TextArea";
import { loadBookDetail } from "../../redux/slices/bookDetailSlice";
import { UserInfo } from "../../models/auth";
interface CommentBoxProps {
  review: Review;
}
const { Panel } = Collapse;

function CommentBox({ review }: CommentBoxProps) {
  const userInfo = useSelector(
    (state: RootStateOrAny) => state.authSlice.userInfo as UserInfo
  );
  const isAuth = useSelector((state: RootStateOrAny) => {
    return state.authSlice.isAuth;
  });
  const dispatch = useDispatch();
  const book: Book = useSelector(
    (state: RootStateOrAny) => state.bookDetailSlice.value as Book
  );
  const [messageComment, setMassageComment] = useState("");
  const onRepCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const [myAvt, setMyAvt] = useState("");
  useEffect(() => {
    if (userInfo.image) console.log(userInfo.image);
    httpClient()
      .get(APP_API.userInfo)
      .then((res) => {
        console.log(res);

        setMyAvt(res.data.image);
        console.log(res.data.image);
      });
  }, []);
  useEffect(() => {}, [review.id]);

  return (
    <>
      <div key={review.id} style={{ borderBottom: "1px solid #efefef" }}>
        <Comment
          author={
            <>
              <a style={{ fontSize: "14px" }}>
                {review.user.lastName + " " + review.user.firstName}
              </a>
              <Rate className="ml-2" value={review.rating} disabled></Rate>
            </>
          }
          avatar={<Avatar src={review.user.image} alt="Han Solo" />}
          content={
            <div className="d-flex">
              <p style={{ fontSize: "16px", width: "80%" }}>{review.message}</p>
              <p style={{ fontSize: "14px", color: "#555555" }}>
                {review.date}
              </p>
            </div>
          }
        >
          <div className="upload__image-wrapper d-flex ">
            {review.reviewImages &&
              review.reviewImages!.map((image, index) => (
                <div key={index} className="image-item mt-2 mr-2">
                  <Image
                    src={image.image}
                    alt=""
                    width={80}
                    height={80}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
          </div>
          <Collapse ghost>
            <Panel
              style={{ padding: "0 0" }}
              header={
                <u style={{ fontSize: "15px", color: "darkgrey" }}>
                  Phản Hồi{" "}
                  {review.reviewReps && "(" + review.reviewReps?.length + ")"}
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
                          {reviewRep.user.lastName +
                            " " +
                            reviewRep.user.firstName}
                        </a>
                      }
                      avatar={<Avatar src={reviewRep.user.image} alt="user" />}
                      content={
                        <div className="d-flex">
                          <p style={{ fontSize: "16px", width: "80%" }}>
                            {reviewRep.message}
                          </p>
                          <p style={{ fontSize: "14px", color: "#555555" }}>
                            {reviewRep.date}
                          </p>
                        </div>
                      }
                    ></Comment>
                  </div>
                ))}

              {isAuth && (
                <div style={{ marginBottom: "5px", marginTop: "10px" }}>
                  <div className="d-flex">
                    <p
                      style={{
                        fontSize: "12px",
                        paddingTop: "0px",
                        marginBottom: 0,
                        color: "#555555",
                      }}
                    >
                      Trả lời&nbsp;
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        paddingTop: "0px",
                        marginBottom: 0,
                        color: "#555555",
                        fontWeight: "5000",
                      }}
                    >
                      {review.user.lastName + " " + review.user.firstName}:
                    </p>
                  </div>
                  <div className="d-flex">
                    <img
                      src={userInfo!.image}
                      height={30}
                      width={30}
                      style={{ borderRadius: "50%", marginRight: 15 }}
                    ></img>

                    <Input.Group compact>
                      {/* </div> */}
                      <Input
                        style={{ width: "calc(100% - 100px)" }}
                        onChange={(e) => onRepCommentChange(e)}
                        value={messageComment}
                      />

                      <Button
                        type="primary"
                        onClick={() => onSendRepComment(review.id)}
                      >
                        Gửi
                      </Button>
                    </Input.Group>
                  </div>
                </div>
              )}
            </Panel>
          </Collapse>
        </Comment>
      </div>
    </>
  );
}

export default CommentBox;
