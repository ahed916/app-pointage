// src/viewmodels/useUserManagementViewModel.js
import { useState, useEffect } from "react";
import { userApi } from "../models/api/userApi";

export function useUserManagementViewModel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    try {
      const data = await userApi.getAllUsers(); // ✅ now works
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Charger au montage
  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refetch: loadUsers, // utile pour recharger après création/suppression
  };
}
