import React from "react";

const Categories = () => {
  const categories = [
    "Men",
    "Women",
    "Kids",
    "Punjabi",
    "Blazer",
    "Uniform",
  ];

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Categories
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {categories.map((category) => (
          <div
            key={category}
            className="bg-white rounded-lg shadow p-6 text-center text-xl font-semibold"
          >
            {category}
          </div>
        ))}

      </div>

    </div>
  );
};

export default Categories;