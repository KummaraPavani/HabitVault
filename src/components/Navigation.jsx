
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/dashboard" className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-primary">EduPair</h1>
          </Link>
          
          <div className="flex space-x-8">
            <NavLink to="/dashboard" current={location.pathname === "/dashboard"}>
              Dashboard
            </NavLink>
            <NavLink to="/offer-session" current={location.pathname === "/offer-session"}>
              Offer Session
            </NavLink>
            <NavLink to="/view-credits" current={location.pathname === "/view-credits"}>
              Credits
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, current, children }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
        current
          ? "text-primary border-b-2 border-primary"
          : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
      }`}
    >
      {children}
    </Link>
  );
}
