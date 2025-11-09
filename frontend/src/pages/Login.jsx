import React, { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import isimmLogo from "../assets/isimmLogo.png";

function Login() {
  // ✅ Only added states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ Only added login function
  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ Prevent default form submission
    setError("");

    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("⚠️ The user does not exist — verify fields");
        return;
      }

      // Save logged user
      const user =data.user
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (user.role === "admin") {
        window.location.href = "/admin/dashboard";
      } 
      else if (user.role === "Professor") {
        window.location.href = "/professor/dashboard"; // ← now professors go here
      } 
      else if (user.role === "Student") {
        window.location.href = "/student/dashboard";
      }

    } catch (err) {
      setError("⚠️ Server not responding");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col lg:flex-row w-full max-w-6xl h-[650px] bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
      >
        {/* LEFT SIDE — unchanged */}
        <div className="lg:w-7/12 w-full bg-gradient-to-br from-blue-300 to-indigo-800 text-white flex flex-col justify-center items-center relative p-10">
          <motion.img src={isimmLogo} alt="ISIMM Logo" className="w-24 h-24 mb-6 drop-shadow-lg" />
          <motion.h2 className="text-4xl font-extrabold text-center mb-2 drop-shadow-lg">
            Smart Attendance System
          </motion.h2>
          <motion.p className="text-lg text-blue-100 text-center mb-8">
            Institut Supérieur d'Informatiques et de Mathématiques — ISIMM
          </motion.p>
          <motion.div className="mt-4">
            <GraduationCap size={60} className="text-blue-200" />
          </motion.div>
        </div>

        {/* RIGHT SIDE — unchanged except small logic additions */}
        <div className="lg:w-5/12 w-full flex flex-col justify-center items-center p-10 bg-gray-50/70">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Sign in to your account
          </h2>

          {/* ✅ Added onSubmit */}
          <form className="w-full max-w-sm space-y-6" onSubmit={handleLogin}>

            {/* email field — ONLY added onChange */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="example@isimm.tn"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2.5 text-gray-900"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* password field — ONLY added onChange */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Your password"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2.5 text-gray-900"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* ✅ Only added this error block */}
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            {/* Button — unchanged */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-400 to-indigo-600 text-white font-semibold shadow-md"
            >
              Connect
            </motion.button>

          </form>
        </div>

      </motion.div>
    </div>
  );
}

export default Login;