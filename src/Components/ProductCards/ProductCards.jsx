import React from "react";
import { Link } from "react-router-dom";

const Badge = ({ children }) => (
  <span className="px-2 py-1 text-[11px] rounded-full bg-[var(--color-accent)] text-gray-900 font-semibold tracking-wide">
    {children}
  </span>
);

const StarRating = ({ rating = 0 }) => {
  const safeRating = Number(rating);

  return (
    <div className="flex items-center gap-1">
      <div className="flex text-yellow-400 text-sm">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>
            {i < Math.round(safeRating) ? "★" : "☆"}
          </span>
        ))}
      </div>

      <span className="text-xs text-gray-500 ml-1">
        {safeRating.toFixed(1)}
      </span>
    </div>
  );
};

const ProductCards = ({ model }) => {
  const {
    productName,
    productImage,
    category,
    price,
    availableQuantity,
    _id,
    Status,
    description,
    rating,
  } = model;

  return (
    <div
      className="
        group h-full flex flex-col
        bg-white dark:bg-gray-900
        rounded-2xl overflow-hidden
        border border-gray-100 dark:border-gray-800
        shadow-sm hover:shadow-xl
        transition-all duration-300
      "
    >
      {/* IMAGE SECTION */}
      <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={productImage}
          alt={productName}
          className="
            w-full h-full object-cover
            group-hover:scale-110
            transition-transform duration-500
          "
        />

        {/* STATUS BADGE */}
        <div className="absolute top-3 left-3">
          <Badge>{Status}</Badge>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">

        {/* TITLE */}
        <h2 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">
          {productName}
        </h2>

        {/* CATEGORY */}
        <div className="mt-2">
          <Badge>{category}</Badge>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description || "No description available"}
        </p>

        {/* META INFO */}
        <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">

          <div className="flex justify-between">
            <span>Price</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {price} Tk
            </span>
          </div>

          <div className="flex justify-between">
            <span>Quantity</span>
            <span>{availableQuantity}</span>
          </div>

          <div className="flex justify-between">
            <span>Rating</span>
            <StarRating rating={rating} />
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-auto pt-4">
          <Link
            to={`/product-details/${_id}`}
            className="
              block w-full text-center
              py-2.5 rounded-xl
              bg-[var(--color-primary)]
              hover:bg-[var(--color-secondary)]
              text-white text-sm font-medium
              transition
              active:scale-[0.98]
            "
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProductCards;