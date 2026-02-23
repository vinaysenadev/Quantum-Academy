import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChart from "@/components/CountChart";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import EventCalendar from "@/components/EventsCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import React from "react";

const AdminPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        {/* usercards */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
        </div>
        {/* charts */}
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[370px]">
            <CountChartContainer />
          </div>
          {/* attendance */}
          <div className="w-full lg:w-2/3 h-[370px]">
            <AttendanceChartContainer />
          </div>
        </div>
        {/* finance chart */}
        <div className="w-full h-[450px]">
          <FinanceChart />
        </div>
      </div>

      {/* right */}
      <div className="border-[1.5px] rounded-md w-full lg:w-1/3">
        <Announcements />
        <EventCalendarContainer searchParams={searchParams} />
      </div>
    </div>
  );
};

export default AdminPage;
