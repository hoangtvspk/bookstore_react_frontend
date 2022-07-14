import {
  faMoneyBill,
  faMoneyBillWave,
  faMoneyCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Image, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";

import EventIcon from "../../image/event.png";

import { EventBooksModel } from "../../models/EventBooks";
import BookCard from "./BookCard";
import "./EventsPage.css";
import dayjs from "dayjs";
function EventDetail() {
  const { id } = useParams();
  const [eventImage, setEventImage] = useState("");
  const [detail, setDetail] = useState("");
  const [dayStart, setDayStart] = useState("");
  const [dayEnd, setDayEnd] = useState("");

  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(true);
  const [bookForEvent, setBookForEvent] = useState<EventBooksModel[]>([]);
  
  // const [timestampDayjs, setTimeStampDayjs] = useState("");
  const getEventDetail = () => {
    setSubmitting(true);
    if (id) {
      httpClient()
        .get(APP_API.getEventDetail.replace(":id", id.toString() || ""))
        .then((res) => {
          setDetail(res.data.detail);
          setDayStart(res.data.dayStart);
          setDayEnd(res.data.dayEnd);
          setEventImage(res.data.image);
          setStatus(res.data.status);
          setBookForEvent(res.data.bookForEvents);
          const intervalId = setInterval(() => {
            updateRemainingTime(res.data.dayEnd.slice(0, 10));
          }, 1000);
          return () => clearInterval(intervalId);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setSubmitting(false));
    }
  };
  // const timestampDayjs = dayjs(1659983662000);
  // const nowDayjs = dayjs();
  const formatDate = (date: string) => {
    return date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
  };
  const getRemainingTimeUntilMsTimestamp = (timestampMs: string) => {
    // console.log(dayjs(timestampMs));
    if (dayEnd !== "") {
    }
    const timestampDayjs = dayjs(timestampMs);
    const nowDayjs = dayjs();
    if (timestampDayjs.isBefore(nowDayjs)) {
      return {
        seconds: "00",
        minutes: "00",
        hours: "00",
        days: "00",
      };
    }
    return {
      seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
      minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
      hours: getRemainingHours(nowDayjs, timestampDayjs),
      days: getRemainingDays(nowDayjs, timestampDayjs),
    };
  };
  const getRemainingSeconds = (
    nowDayjs: dayjs.Dayjs,
    timestampDayjs: dayjs.Dayjs
  ) => {
    const seconds = timestampDayjs.diff(nowDayjs, "seconds") % 60;
    console.log(timestampDayjs.diff(nowDayjs, "seconds"));
    return padWithZeros(seconds, 2);
  };

  const getRemainingMinutes = (
    nowDayjs: dayjs.Dayjs,
    timestampDayjs: dayjs.Dayjs
  ) => {
    const minutes = timestampDayjs.diff(nowDayjs, "minutes") % 60;
    return padWithZeros(minutes, 2);
  };

  const getRemainingHours = (
    nowDayjs: dayjs.Dayjs,
    timestampDayjs: dayjs.Dayjs
  ) => {
    const hours = timestampDayjs.diff(nowDayjs, "hours") % 24;
    return padWithZeros(hours, 2);
  };

  const getRemainingDays = (
    nowDayjs: dayjs.Dayjs,
    timestampDayjs: dayjs.Dayjs
  ) => {
    const days2 = dayjs("2022-07-25");
    const days = timestampDayjs.diff(nowDayjs, "days");
    // const days = days2.diff(nowDayjs, "days");
    // console.log(nowDayjs);
    // console.log(timestampDayjs.diff(nowDayjs, "days"));
    console.log(days);
    return days.toString();
  };

  const padWithZeros = (number: number, minLength: number) => {
    const numberString = number.toString();
    if (numberString.length >= minLength) return numberString;
    return "0".repeat(minLength - numberString.length) + numberString;
  };
  const defaultRemainingTime = {
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
  };
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  const updateRemainingTime = (countdown: string) => {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  };

  useEffect(() => {
    getEventDetail();
    localStorage.setItem("breadcrumb", "List");
  }, []);

  return (
    <>
      <div className=" pb-3">
        <div
          // className="p-3"
          style={{
            backgroundImage: "url(" + eventImage + ")",
          }}
          className="d-flex align-items-center justify-content-center  "
        >
          <div style={{ width: "100%" }}>
            <Image
              //
              width="100%"
              src={eventImage}
              className="image-event-shadow"
            ></Image>
          </div>
        </div>

        <div
          className="bg-white pb-4 pt-4 rounded-3"
          style={{ paddingLeft: "120px", paddingRight: "120px" }}
        >
          <Divider>
            {" "}
            <h3 style={{ color: "	#0099FF", fontFamily: "Helvetica" }}>
              <FontAwesomeIcon
                color="		#FF66FF"
                icon={faMoneyBillWave}
              ></FontAwesomeIcon>{" "}
              Ưu Đãi Khủng - Săn Sale Liền Tay{" "}
              <FontAwesomeIcon
                color="		#FF66FF"
                icon={faMoneyBillWave}
              ></FontAwesomeIcon>
            </h3>
          </Divider>
          <div className=" d-flex justify-content-center mb-3 rounded-3">
            <div className="countdown-timer time-remain-strokeme  d-flex justify-content-center rounded-3">
              {status === "Đang diễn ra" && (
                <>
                  Còn lại: {remainingTime.days} Ngày {remainingTime.hours} Giờ{" "}
                  {remainingTime.minutes} Phút {remainingTime.seconds} Giây
                </>
              )}
              {status === "Sắp diễn ra" && <>Sự Kiện Chưa Bắt Đầu</>}
              {status === "Đã kết thúc" && (
                <>Đã Hết Thời Gian Diễn Ra Sự Kiện</>
              )}
            </div>
          </div>
          {status === "Đang diễn ra" && (
            <div className="event-book-list">
              {bookForEvent.length > 0 &&
                bookForEvent.map((bookEvent: EventBooksModel, index) => (
                  <>
                    {" "}
                    <BookCard bookEvent={bookEvent}></BookCard>
                  </>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EventDetail;
