// src/pages/UserManagementAdmin.jsx
import React from 'react';
import AdminUserTable from "../components/AdminUserTable"; // 👈 CETTE LIGNE MANQUAIT
import { useUserManagementViewModel } from "../viewmodels/useUserManagementViewModel";

export default function UserManagementAdmin() {
  const { users, loading, error } = useUserManagementViewModel();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">User Management</h1>
      <div className="bg-white rounded-2xl shadow p-4">
        <AdminUserTable users={users} loading={loading} error={error} />
      </div>
    </div>
  );
}