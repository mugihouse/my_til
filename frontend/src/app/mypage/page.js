"use client";

import { withAuthServerSideProps } from "../../../lib/auth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Link from "next/link";

const Mypage = () => {
  withAuthServerSideProps("/api/v1/mypage");
  // const handleDateClick = (arg) => {
  //   alert(arg.dateStr);
  // };

  return (
    <>
      <div>
        <div className="calendar-container px-12 py-10">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              start: "prevYear,nextYear",
              center: "title",
              end: "today prev,next",
            }}
            initialView="dayGridMonth"
            // dateClick={handleDateClick}
            eventContent={renderEventContent}
            contentHeight={"40em"}
            events={[{ title: "event 1", date: "2024-03-15" }]}
          />
        </div>
      </div>
    </>
  );
};

// コンテンツの挿入
// 記事コンポーネントを入れる
function renderEventContent(eventInfo) {
  return (
    <>
      <Link href="/">{eventInfo.event.title}</Link>
    </>
  );
}
export default Mypage;
