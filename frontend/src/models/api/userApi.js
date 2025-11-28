// src/models/api/userApi.js
const API_BASE = "http://localhost:8000";

export const userApi = {
  // ✅ Fetch all users
  async getAllUsers() {
    const res = await fetch(`${API_BASE}/users/`);
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    return res.json(); // expects array of users
  },

  // ✅ Create a new user
  async createUser(formData) {
    const res = await fetch(`${API_BASE}/users/create`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      let message = "Failed to create user";
      try {
        const data = await res.json();
        if (data?.detail) {
          message =
            typeof data.detail === "string"
              ? data.detail
              : JSON.stringify(data.detail);
        }
      } catch (e) {
        message = res.statusText || "Server error";
      }
      throw new Error(message);
    }

    return await res.json();
  },
};
