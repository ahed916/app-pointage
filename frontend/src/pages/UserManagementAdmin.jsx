import React from 'react'
import AdminUserTable from "../components/AdminUserTable"


const UserManagementAdmin = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">User Management</h1>
      <div className="bg-white rounded-2xl shadow p-4">
        <AdminUserTable />
      </div>
    </div>
  );
};


export default UserManagementAdmin
