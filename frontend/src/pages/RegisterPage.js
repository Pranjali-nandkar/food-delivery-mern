import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    address: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.post("/auth/register", {
        ...formData,
        user_type: 0
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
      console.error("Registration error:", errorMsg);
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <input type="text" name="fname" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lname" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "REGISTER"}
        </button>
        <p className="switch-login" onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
