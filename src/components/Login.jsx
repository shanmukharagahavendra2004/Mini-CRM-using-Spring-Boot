import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = { email, password };
      const res = await axios.post("http://localhost:5000/api/auth/login", user);
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setEmail("");
        setPassword("");
        // ✅ Navigate to dashboard instead of customers
        navigate("/dashboard");
      } else {
        setError("No token received");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <form
          className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-md"
          onSubmit={handleSubmit}
        >
          <input
            className="border-2 border-black w-full h-10 p-2 focus:outline-none focus:border-blue-500 rounded"
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border-2 border-black w-full h-10 p-2 focus:outline-none focus:border-blue-500 rounded"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="border-2 border-black w-full h-10 p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            type="submit"
          >
            Login
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
