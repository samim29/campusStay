import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="student">Student</option>
          <option value="owner">Owner</option>
        </select>

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;