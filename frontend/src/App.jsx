import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import './App.css'
import AdminLayout from './layouts/AdminLayout';
import { useNavigate } from "react-router-dom";




import DashboardAdmin from './pages/DashboardAdmin';
import UserManagementAdmin from './pages/UserManagementAdmin';
import ClassManagementAdmin from './pages/ClassManagementAdmin';
import CreateUserAdmin from './pages/CreateUserAdmin';


function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardAdmin />} /> {/* default page for the admin*/}
        <Route path="dashboard-admin" element={<DashboardAdmin/>} />
        <Route path="user-management-admin" element={<UserManagementAdmin/>} />
        <Route path="class-management-admin" element={<ClassManagementAdmin/>} />
        <Route path="create-user" element={<CreateUserAdmin/>} />
      </Route>
      </Routes>
      
    </div>
  )
}

export default App



