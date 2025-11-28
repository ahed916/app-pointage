// src/viewmodels/useCreateUserViewModel.js
import { useState } from "react";
import { userApi } from "../models/api/userApi";

export function useCreateUserViewModel(navigate) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await userApi.createUser(formData);
      navigate("/admin/user-management-admin");
      return data; // return backend response if needed
    } catch (err) {
      // err.message is now always a string
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createUser };
}
