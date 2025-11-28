// src/pages/CreateUserAdmin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserViewModel } from "../viewmodels/useCreateUserViewModel";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Avatar,
} from "@heroui/react";

export default function CreateUserAdmin() {
  const navigate = useNavigate();
  const { loading, error, createUser } = useCreateUserViewModel(navigate);

  const [form, setForm] = useState({
    nom: "",
    email: "",
    cin: "",
    telephone: "",
    password: "",
    role: "",
    classe_id: "",
    classes: [],
    subjects: [],
    photo: null,
  });

  const [preview, setPreview] = useState(null);

  const allClasses = [
    { id: "L2INFO-TD1", name: "L2INFO-TD1", subjects: ["Java", "Conception", "AI"] },
    { id: "L3INFO-TD2", name: "L3INFO-TD2", subjects: ["SOA", "Dev Mobile", "Machine Learning"] },
    { id: "L1TIC-TD1", name: "L1TIC-TD1", subjects: ["Dev Web", "Dev Mobile", "French"] },
  ];

  const allSubjects = [
    "Java",
    "Conception",
    "AI",
    "SOA",
    "Dev Mobile",
    "Machine Learning",
    "Dev Web",
    "French",
  ];

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setForm(prev => ({
      ...prev,
      photo: file || null // ensure it's File or null
    }));
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  /**
   * FINAL submit function (ONLY ONE NOW ✔)
   */
   const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    
    // Append all fields EXCEPT photo first
    formData.append("nom", form.nom);
    formData.append("email", form.email);
    formData.append("cin", form.cin);
    formData.append("telephone", form.telephone);
    formData.append("password", form.password);
    formData.append("role", form.role);
    formData.append("classe_id", form.classe_id || "");
    formData.append("classes", JSON.stringify(form.classes));
    formData.append("subjects", JSON.stringify(form.subjects));
  
    // ✅ ONLY append photo if it's a real File object
    if (form.photo instanceof File) {
      formData.append("photo", form.photo);
    }
    // If no photo, don't append the "photo" field at all
  
    await createUser(formData);
  };

  const selectedClass = allClasses.find((cls) => cls.id === form.classe_id);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Create New User
      </h1>

      <Card className="p-6 bg-white shadow-md rounded-2xl max-w-2xl mx-auto">
        <CardHeader className="flex flex-col items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            User Information
          </h2>

          <div className="relative">
            <label htmlFor="photo-upload" className="cursor-pointer group">
              <div className="relative">
                <Avatar
                  src={preview || "https://via.placeholder.com/150"}
                  className="w-32 h-32 text-large border-4 border-gray-200 rounded-full"
                />
              </div>
            </label>

            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>
          <p className="text-gray-500 text-sm mt-1">Upload user photo</p>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Full Name"
              placeholder="Enter user's name"
              value={form.nom}
              onValueChange={(v) => handleChange("nom", v)}
              isRequired
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter email"
              value={form.email}
              onValueChange={(v) => handleChange("email", v)}
              isRequired
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onValueChange={(v) => handleChange("password", v)}
              isRequired
            />

            <Input
              label="CIN"
              placeholder="Enter CIN number"
              value={form.cin}
              onValueChange={(v) => handleChange("cin", v)}
              isRequired
            />

            <Input
              label="Phone Number"
              placeholder="Enter phone number"
              value={form.telephone}
              onValueChange={(v) => handleChange("telephone", v)}
              isRequired
            />

            <Select
              label="Role"
              selectedKeys={form.role ? [form.role] : []}
              onSelectionChange={(keys) =>
                handleChange("role", Array.from(keys)[0])
              }
            >
              <SelectItem key="Student">Student</SelectItem>
              <SelectItem key="Professor">Professor</SelectItem>
            </Select>

            {form.role === "Student" && (
              <>
                <Select
                  label="Class"
                  selectedKeys={form.classe_id ? [form.classe_id] : []}
                  onSelectionChange={(keys) =>
                    handleChange("classe_id", Array.from(keys)[0])
                  }
                >
                  {allClasses.map((cls) => (
                    <SelectItem key={cls.id}>{cls.name}</SelectItem>
                  ))}
                </Select>

                {selectedClass && (
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="font-medium mb-2 text-gray-700">
                      Subjects in {selectedClass.name}:
                    </p>
                    <ul className="list-disc list-inside text-gray-600">
                      {selectedClass.subjects.map((subj) => (
                        <li key={subj}>{subj}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {form.role === "Professor" && (
              <>
                <Select
                  label="Classes Taught"
                  selectionMode="multiple"
                  selectedKeys={form.classes}
                  onSelectionChange={(keys) =>
                    handleChange("classes", Array.from(keys))
                  }
                >
                  {allClasses.map((cls) => (
                    <SelectItem key={cls.id}>{cls.name}</SelectItem>
                  ))}
                </Select>

                <Select
                  label="Subjects Taught"
                  selectionMode="multiple"
                  selectedKeys={form.subjects}
                  onSelectionChange={(keys) =>
                    handleChange("subjects", Array.from(keys))
                  }
                >
                  {allSubjects.map((subj) => (
                    <SelectItem key={subj}>{subj}</SelectItem>
                  ))}
                </Select>
              </>
            )}
          </CardBody>

          <CardFooter className="flex justify-end gap-3">
            <Button
              variant="flat"
              color="default"
              onClick={() => navigate("/admin/user-management-admin")}
            >
              Cancel
            </Button>

            <Button color="primary" type="submit" isLoading={loading}>
              Create User
            </Button>
          </CardFooter>
        </form>

        {error && (
          <p className="text-red-500 text-center mt-3">
            {typeof error === 'string' ? error : JSON.stringify(error)}
          </p>
        )}
      </Card>
    </div>
  );
}
