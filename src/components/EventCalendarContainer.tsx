import { MoreHorizontal } from "lucide-react";
import React from "react";

import EventList from "./EventList";
import EventsCalendar from "./EventsCalendar";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { date } = searchParams;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm h-full">
      <EventsCalendar />
      <div className="flex items-center justify-between mt-6 mb-4">
        <h1 className="text-lg font-semibold text-gray-800">Events</h1>
        <button
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="More event options"
        >
          <MoreHorizontal className="text-gray-400 size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
