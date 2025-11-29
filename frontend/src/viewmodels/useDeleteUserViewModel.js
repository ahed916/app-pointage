import { useState } from "react";

export function useDeleteUserViewModel(navigate) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function deleteUser(userId) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:8000/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      navigate("/admin/user-management-admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, deleteUser };
}
