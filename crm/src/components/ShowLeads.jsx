import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CustomerForm = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [ownerId, setOwnerId] = useState("");

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`${API_URL}/api/customers/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const { name, email, phone, company, ownerId } = res.data;
          setName(name);
          setEmail(email);
          setPhone(phone);
          setCompany(company);
          setOwnerId(ownerId);
        } catch (err) {
          console.error("Error fetching customer:", err);
        }
      };
      fetchCustomer();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customer = { name, email, phone, company, ownerId };
    const token = localStorage.getItem("token");

    try {
      if (id) {
        await axios.put(`${API_URL}/api/customers/${id}`, customer, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/api/customers`, customer, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setOwnerId("");
      navigate("/showCustomers");
    } catch (err) {
      console.error("Error submitting form:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 px-4 sm:px-6 lg:px-8">
      <form
        className="flex flex-col gap-3 w-full max-w-md"
        onSubmit={handleSubmit}
      >
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

        <input
          className="outline-none border-2 border-black h-10 p-2 rounded focus:border-blue-500"
          type="text"
          value={ownerId}
          placeholder="Enter Owner ID"
          onChange={(e) => setOwnerId(e.target.value)}
        />

        <button
          type="submit"
          className="h-10 bg-lime-500 text-white font-bold rounded hover:bg-lime-600"
        >
          {id ? "Update Customer" : "Add Customer"}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
