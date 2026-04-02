import React, { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 👈 for redirect

  useEffect(() => {
    API.get("/user")
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch profile. Please login again.");
      });
  }, []);

  const handleUpdate = (formData) => {
    API.put("/user", formData)
      .then(() => {
        alert("Profile updated successfully!");
        navigate("/"); // 👈 Redirect to Home/Menu
      })
      .catch((err) => {
        console.error(err);
        alert("Update failed: " + (err.response?.data?.message || err.message));
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && <ProfileForm user={user} onUpdate={handleUpdate} />}
    </div>
  );
};

export default ProfilePage;
