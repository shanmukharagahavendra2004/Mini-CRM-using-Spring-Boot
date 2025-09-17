import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CustomerForm = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        setError("");
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`${API_URL}/api/customers/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const customer = res.data;
          setName(customer.name || "");
          setEmail(customer.email || "");
          setPhone(customer.phone || "");
          setCompany(customer.company || "");
        } catch (err) {
          setError(err.response?.data?.message || err.message);
        }
      };
      fetchCustomer();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    const customerData = { name, email, phone, company };

    try {
      if (id) {
        await axios.put(`${API_URL}/api/customers/${id}`, customerData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Customer updated successfully");
      } else {
        await axios.post(`${API_URL}/api/customers`, customerData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Customer added successfully");
      }

      navigate("/customers");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 px-4 sm:px-6 lg:px-8">
      <form className="flex flex-col gap-3 w-full max-w-md" onSubmit={handleSubmit}>
        <input
          className="outline-none border-2 border-black h-10 p-2 rounded focus:border-blue-500"
          type="text"
          value={name}
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="outline-none border-2 border-black h-10 p-2 rounded focus:border-blue-500"
          type="email"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="outline-none border-2 border-black h-10 p-2 rounded focus:border-blue-500"
          type="text"
          value={phone}
          placeholder="Enter Phone no."
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="outline-none border-2 border-black h-10 p-2 rounded focus:border-blue-500"
          type="text"
          value={company}
          placeholder="Enter Company"
          onChange={(e) => setCompany(e.target.value)}
        />

        <button
          type="submit"
          className="h-10 bg-lime-500 text-white font-bold rounded hover:bg-lime-600"
        >
          {id ? "Update Customer" : "Add Customer"}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CustomerForm;
