import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faAddressCard,
  faMailBulk,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function PageFooter() {
  return (
    <div className="layout-footer">
      <div style={{ paddingLeft: "20px" }}>
        <h4 style={{ color: "darkgrey" }}>Contact:</h4>
        <p style={{ paddingLeft: "10px", marginBottom: "2px" }}>
          {" "}
          <FontAwesomeIcon className="mr-2" icon={faPhone} /> 0935970861 |
          0983553096
        </p>
        <p style={{ paddingLeft: "10px", marginBottom: "2px" }}>
          {" "}
          <FontAwesomeIcon className="mr-2" icon={faMailBulk} />{" "}
          18110278@student.hcmute.edu.vn
        </p>
        <p style={{ paddingLeft: "10px", marginBottom: "2px" }}>
          {" "}
          <FontAwesomeIcon className="mr-2" icon={faMailBulk} />{" "}
          18110289@student.hcmute.edu.vn
        </p>
      </div>
      <div style={{ paddingLeft: "60px" }}>
        <h4 style={{ color: "darkgrey" }}>Address:</h4>
        <p style={{ paddingLeft: "20px", marginBottom: "2px" }}>
          {" "}
          <FontAwesomeIcon className="mr-2" icon={faAddressCard} /> 484 Le Van
          Viet, Tang Nhon Phu A Ward, Thu Duc City
        </p>
        <p style={{ paddingLeft: "20px", marginBottom: "2px" }}>
          {" "}
          <FontAwesomeIcon className="mr-2" icon={faAddressCard} /> 01 Vo Van
          Ngan, Linh Chieu Ward, Thu Duc City
        </p>
      </div>
      <div style={{ paddingLeft: "100px" }}>
        <h4 style={{ color: "darkgrey" }}>Or:</h4>

        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FdoubHBookStore&tabs&width=340&height=70&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="340"
          height="70"
          style={{ border: "none", overflow: "hidden", paddingLeft: "20px" }}
          scrolling="no"
          frameBorder={0}
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
}

export default PageFooter;
