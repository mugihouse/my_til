"use client";

import { withAuthServerSideProps } from "../../../lib/auth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "@mui/material";

const MyPage = () => {
  withAuthServerSideProps("/api/v1/mypage");
  // const handleDateClick = (arg) => {
  //   alert(arg.dateStr);
  //   console.log(arg);
  // };
  const generateEvents = (info, successCallback) => {
    const getMonthData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
            "/api/v1/articles/month_data/" +
            `${info.startStr}`,
          {
            headers: {
              uid: Cookies.get("uid"),
              client: Cookies.get("client"),
              "access-token": Cookies.get("access-token"),
            },
          }
        );
        successCallback(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getMonthData();
  };

  return (
    <>
      <div className="calendar-container px-16 py-10">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            start: "prevYear,nextYear",
            center: "title",
            end: "today prev,next",
          }}
          initialView="dayGridMonth"
          showNonCurrentDates={false}
          // dateClick={handleDateClick}
          eventContent={renderEventContent}
          contentHeight={"40em"}
          events={generateEvents}
          eventBackgroundColor="white"
          eventBorderColor="white"
          eventTextColor="black"
        />
      </div>
    </>
  );
};

// イベントコンポーネント
const renderEventContent = (eventInfo) => {
  return (
    <>
      <Link
        href={`/article/${eventInfo.event.id}`}
        color="inherit"
        sx={{ fontWeight: "bold" }}
        className="event-title-link"
      >
        {eventInfo.event.title}
      </Link>
    </>
  );
};

export default MyPage;
