import React from 'react'
import AdminSideBar, { AdminSideBarItems } from "../components/AdminSideBar";
import { LayoutDashboard, Users, Clipboard } from "lucide-react";
import { Outlet } from "react-router-dom";
function AdminLayout() {
  return (
    <>
    <div className="flex">
      
      <AdminSideBar>
          <AdminSideBarItems icon={<LayoutDashboard size={20} />} text="Dashboard" to="/admin/dashboard-admin"/>
          <AdminSideBarItems icon={<Users size={20} />} text="User Management" to="/admin/user-management-admin" />
          <AdminSideBarItems icon={<Clipboard size={20} />} text="Class Management" to="/admin/class-management-admin" />
        </AdminSideBar>
        <main className="flex-1 overflow-auto bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
   
    </>
  )
}

export default AdminLayout
