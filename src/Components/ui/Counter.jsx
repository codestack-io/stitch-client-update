import React, { useEffect, useState } from "react";

const Counter = ({ end, label, color = "#FF62BB" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold" style={{ color }}>
        {count}+
      </h2>
      <p className="text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  );
};

export default Counter;