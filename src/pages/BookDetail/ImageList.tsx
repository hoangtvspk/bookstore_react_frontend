import { Image } from "antd";
import { useEffect } from "react";
import { BookImage } from "../../models/book";

interface ImageListProps {
  image: BookImage;
}

function ImageList({ image }: ImageListProps) {
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
          }}
        ></Image>
      </div>
    </>
  );
}

export default ImageList;
