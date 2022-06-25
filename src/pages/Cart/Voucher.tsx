import { faSeedling, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../../routers/config";

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
