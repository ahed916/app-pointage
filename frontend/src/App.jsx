import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

import React from 'react'
import DashboardAdmin from './pages/DashboardAdmin';

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard-admin" element={<DashboardAdmin/>} />

      </Routes>
      
    </div>
  )
}

export default App


