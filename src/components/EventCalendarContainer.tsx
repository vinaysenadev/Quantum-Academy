import { MoreHorizontal } from "lucide-react";
import React from "react";
import Calendar from "react-calendar/src/Calendar.jsx";
import EventList from "./EventList";
import EventsCalendar from "./EventsCalendar";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { date } = searchParams;

  return (
    <div className="bg-white p-4 rounded-md">
      <EventsCalendar />
      <div className="flex items-center justify-between">
        <h1 className="text-md font-semibold my-4">Events</h1>
        <MoreHorizontal className="text-gray-400" />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
