import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Leaf, Menu, X, ArrowRight } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "DETECTION", path: "/detection" },
    { name: "RESULTS", path: "/results" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:bg-emerald-800 transition-colors">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-none">Agri AI</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">Tomato Disease Detection</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  "text-sm font-semibold tracking-wide transition-colors duration-150 py-1 border-b-2 " +
                  (isActive
                    ? "text-emerald-800 border-emerald-600 font-bold"
                    : "text-slate-600 border-transparent hover:text-emerald-700 hover:border-emerald-300")
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <button
              onClick={() => navigate("/detection")}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm hover:shadow-md transition-all duration-150 space-x-2"
            >
              <span>Start Detection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                "block px-3 py-2.5 rounded-md text-base font-semibold " +
                (isActive
                  ? "bg-emerald-50 text-emerald-800 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900")
              }
            >
              {item.name}
            </NavLink>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/detection");
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-white bg-emerald-700 font-semibold"
            >
              <span>Start Detection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

