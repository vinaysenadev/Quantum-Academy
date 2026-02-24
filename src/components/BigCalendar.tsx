"use client";

import moment from "moment";
import { useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const BigCalendar = ({
  data,
}: {
  data: { id: number; title: string; start: Date; end: Date }[];
}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <div className="h-full" role="region" aria-label="School Schedule Calendar">
      <Calendar
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        views={["work_week", "day"]}
        view={view}
        style={{ height: "100%" }}
        onView={handleOnChangeView}
        min={new Date(2026, 1, 0, 8, 0, 0)}
        max={new Date(2026, 1, 0, 22, 0, 0)}
      />
    </div>
  );
};

export default BigCalendar;
