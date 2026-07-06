import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import img1 from "../../../assets/cloth.jpg";
import img2 from "../../../assets/tracker.webp";

const Banner = () => {
  return (
    <div className="h-[70vh] w-full">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={4000}
      >
        {/* SLIDE 1 */}
        <div className="relative h-[70vh]">
          <img
            src={img1}
            className="h-[70vh] w-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40 flex items-center px-10">
            <div className="text-left max-w-xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Ensure Your Order With Confidence
              </h1>

              <p className="text-lg mb-6 text-gray-200">
                Fast delivery, trusted service, and premium quality products.
              </p>

             <Link to="/products">
            <button className="px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-xl font-semibold transition">
              Shop Now
            </button>
            </Link>
            </div>
          </div>
        </div>

        {/* SLIDE 2 */}
        <div className="relative h-[70vh]">
          <img
            src={img2}
            className="h-[70vh] w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex items-center px-10">
            <div className="text-left max-w-xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Track Your Orders Easily
              </h1>

              <p className="text-lg mb-6 text-gray-200">
                Real-time tracking and seamless order management system.
              </p>

              <button className="px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-xl font-semibold transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;