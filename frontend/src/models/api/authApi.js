export const authApi = {
  async login(email, password) {
    const res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || "Invalid credentials");
    }

    // ✅ The response BODY IS the user object (not { user: ... })
    const user = await res.json();
    return user; // ← direct user object
  },
};
