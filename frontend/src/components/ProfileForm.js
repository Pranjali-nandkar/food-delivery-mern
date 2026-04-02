import React, { useState } from "react";
import "./ProfileForm.css"; // ← include the CSS

const ProfileForm = ({ user, onUpdate }) => {
  const [form, setForm] = useState(user);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h3>Edit Profile</h3>

      <label>First Name</label>
      <input
        name="fname"
        value={form.fname}
        onChange={handleChange}
        placeholder="First Name"
      />

      <label>Last Name</label>
      <input
        name="lname"
        value={form.lname}
        onChange={handleChange}
        placeholder="Last Name"
      />

      <label>Email</label>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <label>Address</label>
      <input
        name="address"
        value={form.address || ""}
        onChange={handleChange}
        placeholder="Address"
      />

      <div className="profile-buttons">
        <button type="submit">Update Profile</button>
      </div>
    </form>
  );
};

export default ProfileForm;
