import React, { useState } from "react";

export default function AdminProfessorForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Professor created:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" onChange={handleChange} placeholder="Nom complet" className="w-full border p-2 rounded" />
      <input name="email" onChange={handleChange} placeholder="Email" type="email" className="w-full border p-2 rounded" />
      <input name="department" onChange={handleChange} placeholder="Département" className="w-full border p-2 rounded" />
      <input name="phone" onChange={handleChange} placeholder="Téléphone" className="w-full border p-2 rounded" />

      <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        Créer le compte Professeur
      </button>
    </form>
  );
}