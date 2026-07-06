import React, { useState } from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Components/Hooks/useAuth";
import Badge from "../../../Components/ui/Badge";
import Modal from "../../../Components/ui/Modal";

const Navbar = () => {
  const { logOut, user } = useAuth() || {};
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logOut?.()
      .then(() => setOpen(false))
      .catch((error) => console.log(error));
  };

  const linkClass =
    "text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 " +
    "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800";

  const activeClass =
    "bg-[#FF62BB] text-white";

  const Links = (
    <>
      <li>
        <NavLink to="" className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }>
          Products
        </NavLink>
      </li>

      <li>
        <NavLink to="/servicesection" className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }>
          Services
        </NavLink>
      </li>

      <li>
        <NavLink to="/blogs" className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }>
          Blogs
        </NavLink>
      </li>

      <li>
        <NavLink to="/Products" className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }>
          All Products
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard" className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }>
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white dark:bg-gray-900 shadow-md px-4 md:px-8">

      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <button className="btn btn-ghost lg:hidden rounded-xl">
            ☰
          </button>

          <ul className="menu menu-sm dropdown-content bg-white dark:bg-gray-900 rounded-xl mt-3 w-52 p-2 shadow-lg">
            {Links}
          </ul>
        </div>

        <Logo />
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          {Links}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex items-center gap-3">

        {/* ✅ BADGE ADDED */}
        {user && (
          <Badge variant="accent">
            Logged In
          </Badge>
        )}

        {user ? (
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#FF62BB] text-white text-sm font-medium hover:bg-[#B331F1] transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl bg-[#FF62BB] text-white text-sm font-medium hover:bg-[#B331F1] transition"
          >
            Login
          </Link>
        )}

        {/* USER INFO */}
        {user?.photoURL && (
          <img
            className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700"
            src={user.photoURL}
            alt="user"
          />
        )}

        <div className="hidden md:block">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {user?.displayName}
          </p>
        </div>
      </div>

      {/* ✅ MODAL */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Navbar;