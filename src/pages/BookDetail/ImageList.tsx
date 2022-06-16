import { Book, BookImage, Category } from "../../models/book";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Card, Image, Rate, Comment } from "antd";
import Meta from "antd/lib/card/Meta";
import { httpClient } from "../../httpClient/httpServices";
import { APP_API } from "../../httpClient/config";
import { updateKeySearch } from "../../redux/slices/keySearchSlice";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../routers/config";

interface ImageListProps {
  image: BookImage;
}

function ImageList({ image }: ImageListProps) {
  const [imageBorder, setImageBorder] = useState("1px solid #AAAAAA");
  const onImageChoose = () => {
    setImageBorder("1px solid #0066FF");
  };

  useEffect(() => {}, [image.id]);

  return (
    <>
      <div>
        {/* <img src={image.image} className="list-image"></img> */}
        <Image
          src={image.image}
          width={80}
          height={100}
          style={{
            marginBottom: "0 !important",
            paddingBottom: "0 !important",
            paddingLeft: 10,
            paddingRight: 10,
            border: imageBorder,
          }}
        ></Image>
      </div>
    </>
  );
}

export default ImageList;
