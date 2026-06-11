import React from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

// SAMPLE REAL DATA (replace with API later)
const data = [
  { name: "Jan", orders: 30, revenue: 400 },
  { name: "Feb", orders: 50, revenue: 600 },
  { name: "Mar", orders: 80, revenue: 900 },
  { name: "Apr", orders: 40, revenue: 500 },
];

const pieData = [
  { name: "Paid", value: 70 },
  { name: "Pending", value: 20 },
  { name: "Failed", value: 10 },
];

const DashboardCharts = () => {
  return (
    <div className="grid gap-6">

      {/* BAR CHART */}
      <div className="w-full h-72">
        <h2 className="font-bold mb-2">Orders Overview</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* LINE CHART */}
      <div className="w-full h-72">
        <h2 className="font-bold mb-2">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* PIE CHART */}
      <div className="w-full h-72">
        <h2 className="font-bold mb-2">Payment Status</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" fill="#8884d8">
              <Cell fill="#22c55e" />
              <Cell fill="#facc15" />
              <Cell fill="#ef4444" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default DashboardCharts;