import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import './App.css'
import AdminLayout from './layouts/AdminLayout';
import ProfessorDashboard from './pages/ProfessorDashboard'; // Add this import
import StudentDashboard from './pages/StudentDashboard'; // Add this import

import DashboardAdmin from './pages/DashboardAdmin';
import UserManagementAdmin from './pages/UserManagementAdmin';
import ClassManagementAdmin from './pages/ClassManagementAdmin';
import CreateUserAdmin from './pages/CreateUserAdmin';
import DeleteUserAdmin from "./pages/DeleteUserAdmin";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="dashboard-admin" element={<DashboardAdmin/>} />
          <Route path="user-management-admin" element={<UserManagementAdmin/>} />
          <Route path="class-management-admin" element={<ClassManagementAdmin/>} />
          <Route path="create-user" element={<CreateUserAdmin/>} />
          <Route path="/admin/delete-user/:id" element={<DeleteUserAdmin />} />

        </Route>
      </Routes>
    </div>
  )
}

export default App