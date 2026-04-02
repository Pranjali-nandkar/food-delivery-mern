import React, { useState } from "react";

const SignupForm = ({ onRegister }) => {
  const [form, setForm] = useState({ fname: "", lname: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <input type="text" name="fname" placeholder="First Name" value={form.fname} onChange={handleChange} className="w-full p-2 border mb-2" />
      <input type="text" name="lname" placeholder="Last Name" value={form.lname} onChange={handleChange} className="w-full p-2 border mb-2" />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border mb-2" />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 border mb-2" />
      <button type="submit" className="bg-green-500 text-white p-2 w-full">Register</button>
    </form>
  );
};

export default SignupForm;
