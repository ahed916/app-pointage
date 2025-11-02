import React from 'react'
import AdminSideBar , {AdminSideBarItems} from '../components/AdminSideBar'
import {LayoutDashboard, Users, Clipboard } from "lucide-react"

function DashboardAdmin() {
  return (
    <>
    <div className="flex">
      <AdminSideBar>
          <AdminSideBarItems icon={<LayoutDashboard size={20} />} text="Dashboard" active />
          <AdminSideBarItems icon={<Users size={20} />} text="User Management" />
          <AdminSideBarItems icon={<Clipboard size={20} />} text="Class Management" />
        </AdminSideBar>
    </div>
    </>
  )
}

export default DashboardAdmin
