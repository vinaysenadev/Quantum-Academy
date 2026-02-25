"use client";

import React from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const data = [
  { name: "Achieved", value: 92, fill: "#C3EBFA" },
  { name: "Remaining", value: 8, fill: "#FAE27C" },
];

const Performance = () => {
  return (
    <div className="bg-white p-4 rounded-xl h-80 relative shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-semibold text-gray-800">Performance</h1>
      </div>

      <div
        className="w-full h-full"
        role="img"
        aria-label="Student performance chart showing 9.2 out of 10 LTS"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              fill="#8884d8"
              stroke="none"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-4">
        <h1 className="text-4xl font-extrabold text-gray-800">9.2</h1>
        <p className="text-xs font-medium text-gray-400">of 10 max LTS</p>
      </div>

      <h2 className="font-semibold absolute bottom-12 left-0 right-0 text-center text-gray-600 text-sm">
        1st Semester - 2nd Semester
      </h2>
    </div>
  );
};

export default Performance;
