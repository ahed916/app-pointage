// src/pages/DeleteUserAdmin.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardFooter } from "@heroui/react";

export default function DeleteUserAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        navigate("/admin/user-management-admin");
      }
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <Card className="max-w-md w-full p-6">
        <CardBody>
          <h2 className="text-xl font-semibold text-center">Delete User</h2>
          <p className="text-center mt-2 text-gray-600">
            Are you sure you want to delete user ID: <strong>{id}</strong>?
          </p>
        </CardBody>
        <CardFooter className="flex justify-between">
          <Button variant="flat" onPress={() => navigate(-1)}>
            Cancel
          </Button>
          <Button color="danger" onPress={handleDelete}>
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}