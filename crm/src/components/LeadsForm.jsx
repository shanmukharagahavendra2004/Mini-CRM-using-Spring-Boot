import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const LeadsForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const customerIdFromUrl = queryParams.get("customerId");
  const [customerId] = useState(customerIdFromUrl || "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("New");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      const lead = {
        customerId,
        title,
        description,
        status,
        value: Number(value),
      };
      await axios.post("http://localhost:5000/api/leads", lead, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle("");
      setDescription("");
      setStatus("New");
      setValue("");
      if (customerId) {
        navigate(`/showLeads/${customerId}`);
      } else {
        navigate("/showLeads");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <form
        className="flex flex-col gap-4 w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <input
          className="outline-none border-2 border-black w-full h-10 p-2 bg-gray-100"
          type="text"
          value={customerId}
          readOnly
        />
        <input
          className="outline-none border-2 border-black w-full h-10 p-2 focus:border-blue-500"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          required
        />
        <input
          className="outline-none border-2 border-black w-full h-10 p-2 focus:border-blue-500"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
        <select
          className="outline-none border-2 border-black w-full h-10 p-2 focus:border-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>
        <input
          className="outline-none border-2 border-black w-full h-10 p-2 focus:border-blue-500"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
        <button
          className="outline-none border-2 border-black w-full h-10 p-2 bg-lime-500 text-white font-bold focus:border-blue-500"
          type="submit"
        >
          Add Lead
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default LeadsForm;
