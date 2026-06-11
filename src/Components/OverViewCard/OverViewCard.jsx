import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const OverviewCards = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axiosSecure.get("/stats");
      setStats(res.data);
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  const cards = [
    { title: "Total Products", value: stats.products },
    { title: "Total Users", value: stats.users },
    { title: "Total Orders", value: stats.orders },
    { title: "Total Payments", value: stats.payments },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div key={i} className="p-4 bg-white shadow rounded">
          <h2 className="text-gray-500">{c.title}</h2>
          <p className="text-2xl font-bold">{c.value}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;