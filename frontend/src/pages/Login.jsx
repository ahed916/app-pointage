import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import isimmLogo from "../assets/isimmLogo.png";

function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col lg:flex-row w-full max-w-6xl h-[650px] bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
      >
        {/*left side*/}
        <div className="lg:w-7/12 w-full bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex flex-col justify-center items-center relative p-10">
          
          {/*decoration*/}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>

          {/*logo isimm*/}
          <motion.img
            src={isimmLogo}
            alt="ISIMM Logo"
            className="w-24 h-24 mb-6 drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />

          {/*titre*/}
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-4xl font-extrabold text-center mb-2 drop-shadow-lg"
          >
            Smart Attendance System
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg text-blue-100 text-center mb-8"
          >
            Institut Supérieur d'Informatiques et de Mathématiques — ISIMM
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-4"
          >
            <GraduationCap size={60} className="text-blue-200" />
          </motion.div>
        </div>

        {/*right side*/}
        <div className="lg:w-5/12 w-full flex flex-col justify-center items-center p-10 bg-gray-50/70">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Sign in to your account
          </h2>

          <form className="w-full max-w-sm space-y-6">
            {/*email*/}
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
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>

            {/*password*/}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Your password"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
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
