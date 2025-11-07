import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import React, { createContext, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import isimmLogo from "../assets/isimmLogo.png";

const SidebarContext = createContext();

export default function AdminSideBar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen flex flex-col shadow-lg">
      <nav className="relative h-full flex flex-col text-white bg-gradient-to-br from-blue-300 to-indigo-800 overflow-hidden">
        {/* Decorative blurred circles */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="p-4 pb-2 flex justify-between items-center relative z-10">
          <img
            src={isimmLogo}
            alt="ISIMM Logo"
            className={`transition-all rounded-md duration-300 ${
              expanded ? "w-20 opacity-100" : "w-0 opacity-0"
            }`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            {expanded ? (
              <ChevronFirst className="text-white" />
            ) : (
              <ChevronLast className="text-white" />
            )}
          </button>
        </div>

        {/* Items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 overflow-y-auto px-3 space-y-1 relative z-10">
            {children}
          </ul>
        </SidebarContext.Provider>

        {/* Footer */}
        <div className="border-t border-white/20 flex items-center gap-3 p-3 relative z-10 bg-white/5">
          <img src={isimmLogo} className="w-10 h-10 rounded-lg" />
          <div
            className={`flex justify-between items-center transition-all duration-300 overflow-hidden ${
              expanded ? "w-52 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <div className="leading-tight">
              <h4 className="font-semibold text-sm">Smart Attendance System</h4>
              <span className="text-xs text-white/80">
                smartAttendance@isimm.tn
              </span>
            </div>
            <MoreVertical size={18} className="text-white/70" />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function AdminSideBarItems({ icon, text, to }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-xl transition-all duration-200 ${
            isActive
              ? "bg-white/20 text-white font-semibold"
              : "hover:bg-white/10 text-white/80"
          }`
        }
      >
        <div className="flex-shrink-0">{icon}</div>
        <span
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? "w-40 opacity-100" : "w-0 opacity-0"
          }`}
        >
          {text}
        </span>
      </NavLink>
    </li>
  );
}
