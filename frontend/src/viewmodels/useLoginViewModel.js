import { useState } from "react";
import { authApi } from "../models/api/authApi";

/**
 * ViewModel for login logic
 * @returns {{
 *   email: string,
 *   password: string,
 *   error: string | null,
 *   setEmail: (email: string) => void,
 *   setPassword: (password: string) => void,
 *   login: () => Promise<void>
 * }}
 */
export function useLoginViewModel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const login = async () => {
    try {
      setError(null);
      const user = await authApi.login(email, password);

      // Sauvegarde l'utilisateur
      localStorage.setItem("user", JSON.stringify(user));

      // Redirection basée sur le rôle
      switch (user.role) {
        case "admin":
          window.location.href = "/admin/dashboard";
          break;
        case "Professor":
          window.location.href = "/professor/dashboard";
          break;
        case "Student":
          window.location.href = "/student/dashboard";
          break;
        default:
          throw new Error("Unknown role");
      }
    } catch (err) {
      setError(err.message || "⚠️ Server not responding");
    }
  };

  return {
    email,
    password,
    error,
    setEmail,
    setPassword,
    login,
  };
}
