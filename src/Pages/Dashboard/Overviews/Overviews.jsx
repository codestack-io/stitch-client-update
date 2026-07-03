import React from "react";
import { FaBoxOpen, FaUsers, FaCheckCircle, FaClock } from "react-icons/fa";

const Overview = () => {
  const cards = [
    {
      title: "Total Orders",
      value: 120,
      icon: <FaBoxOpen className="text-3xl text-blue-600" />,
    },
    {
      title: "Approved Orders",
      value: 95,
      icon: <FaCheckCircle className="text-3xl text-green-600" />,
    },
    {
      title: "Pending Orders",
      value: 25,
      icon: <FaClock className="text-3xl text-orange-500" />,
    },
    {
      title: "Users",
      value: 40,
      icon: <FaUsers className="text-3xl text-purple-600" />,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center"
          >
            <div>
              <h3 className="text-gray-500">{card.title}</h3>
              <p className="text-3xl font-bold">{card.value}</p>
            </div>

            {card.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;