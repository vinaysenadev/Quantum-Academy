"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventsCalendar = () => {
  const router = useRouter();
  const [value, onChange] = useState<Value>(new Date());

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value.toLocaleDateString("en-us")}`);
    }
  }, [router, value]);

  return (
    <div
      className="flex justify-center"
      role="region"
      aria-label="Events Calendar"
    >
      <Calendar
        onChange={onChange}
        value={value}
        className="border-none shadow-sm rounded-lg"
      />
    </div>
  );
};

export default EventsCalendar;
