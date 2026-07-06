import React from "react";
import { Link } from "react-router-dom";
import stitchlogo from "../../assets/vecteezy_knitting-with-needles-and-ball-of-yarn-handmade-clothes_23336858.jpg";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        src={stitchlogo}
        className="w-10 h-10 rounded-full"
        alt="Stitch Track Logo"
      />

      <h2 className="text-xl font-semibold">
        Stitch <span className="font-bold text-amber-500">Track</span>
      </h2>
    </Link>
  );
};

export default Logo;