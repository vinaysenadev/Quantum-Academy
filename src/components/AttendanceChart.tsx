"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mon",
    present: 60,
    absent: 40,
  },
  {
    name: "Tue",
    present: 70,
    absent: 60,
  },
  {
    name: "Wed",
    present: 90,
    absent: 75,
  },
  {
    name: "Thu",
    present: 90,
    absent: 75,
  },
  {
    name: "Fri",
    present: 65,
    absent: 55,
  },
];

const AttendanceChart = () => {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart width={500} height={300} data={data} barSize={20}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tick={{ fill: "#9ca3af", fontSize: "12px" }}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          tick={{ fill: "#9ca3af", fontSize: "12px" }}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "10px",
            borderColor: "lightgray",
            fontSize: "12px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        />
        <Legend
          align="left"
          verticalAlign="top"
          wrapperStyle={{
            paddingTop: "10px",
            paddingBottom: "30px",
            fontSize: "13px",
            fontWeight: "500",
          }}
        />
        <Bar
          dataKey="present"
          fill="#FAE27C"
          legendType="circle"
          radius={[4, 4, 0, 0]}
          name="Present"
        />
        <Bar
          dataKey="absent"
          fill="#C3EBFA"
          legendType="circle"
          radius={[4, 4, 0, 0]}
          name="Absent"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AttendanceChart;
