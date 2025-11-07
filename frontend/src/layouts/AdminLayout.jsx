import React from 'react';
import AdminSideBar, { AdminSideBarItems } from "../components/AdminSideBar";
import { LayoutDashboard, Users, Clipboard } from "lucide-react";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar stays fixed */}
      <div className="fixed top-0 left-0 h-full z-50">
        <AdminSideBar>
          <AdminSideBarItems 
            icon={<LayoutDashboard size={20} />} 
            text="Dashboard" 
            to="/admin/dashboard-admin" 
          />
          <AdminSideBarItems 
            icon={<Users size={20} />} 
            text="User Management" 
            to="/admin/user-management-admin" 
          />
          <AdminSideBarItems 
            icon={<Clipboard size={20} />} 
            text="Class Management" 
            to="/admin/class-management-admin" 
          />
        </AdminSideBar>
      </div>

      {/* Main content — shifted to the right */}
      <main className="flex-1 ml-[260px] overflow-y-auto bg-gray-50 min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
