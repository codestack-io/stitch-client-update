import React from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import useRole from "../Components/Hooks/UseRole";

import {
  MdAccountCircle,
  MdOutlineProductionQuantityLimits,
  MdPendingActions,
} from "react-icons/md";

import { FaBox, FaCreditCard } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { FcApproval } from "react-icons/fc";

const DashboardLayout = () => {
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content">
        <nav className="navbar w-full bg-base-300">
          <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
            ☰
          </label>
          <div className="px-4">Stitch-Tracker</div>
        </nav>

        <Outlet />
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <ul className="menu p-4 w-64 bg-base-200 min-h-full">

          {/* ================= USER MENU ================= */}
          <li className="menu-title">User Panel</li>

          <li>
            <NavLink to="/dashboard/overview">📊 Overview</NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/my-items">📦 My Items</NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/myprofile">
              <MdAccountCircle /> My Profile
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/settings">⚙️ Settings</NavLink>
          </li>

          {/* ================= ADMIN MENU ================= */}
          {role === "admin" && (
            <>
              <li className="menu-title">Admin Panel</li>

              <li>
                <NavLink to="/dashboard/manageusers">
                  <GrUserManager /> Manage Users
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manage-items">
                  <MdOutlineProductionQuantityLimits /> Manage Items
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/allorders">
                  <FaBox /> Orders
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/reports">📊 Reports</NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/categories">📂 Categories</NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/payment-history">
                  <FaCreditCard /> Payments
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/approvedorders">
                  <FcApproval /> Approved Orders
                </NavLink>
              </li>
            </>
          )}

          {/* COMMON */}
          <li className="mt-4">
            <NavLink to="/dashboard/pendingorders">
              <MdPendingActions /> Pending Orders
            </NavLink>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;