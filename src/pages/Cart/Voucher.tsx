import { Book, Category } from "../../models/book";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faSeedling,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, Card, Rate, Comment, Collapse, Button, Divider } from "antd";
import Meta from "antd/lib/card/Meta";
import { httpClient } from "../../httpClient/httpServices";
import { APP_API } from "../../httpClient/config";
import { updateKeySearch } from "../../redux/slices/keySearchSlice";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "../../routers/config";
import { Review } from "../../models/reviews";
import { ReviewRep } from "../../models/reviewRep";
import TextArea from "antd/lib/input/TextArea";
import { loadBookDetail } from "../../redux/slices/bookDetailSlice";

function Voucher() {
  useEffect(() => {}, []);

  return (
    <>
      <div className="bg-white checkCountBox  rounded-3">
        <p
          style={{
            color: "#111111",
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: 0,
          }}
        >
          <FontAwesomeIcon
            className="mr-2"
            icon={faTicketAlt}
            color="	#3366FF"
          />
          Mã Giảm Giá
        </p>
        <Divider className="mt-3 mb-1"></Divider>

        <Link to={appRoutes.forgotpassword}>
          <FontAwesomeIcon className="mr-2" icon={faSeedling} color="	#3366FF" />
          Chọn hoặc nhập mã giảm giá khác
        </Link>
      </div>
    </>
  );
}

export default Voucher;
