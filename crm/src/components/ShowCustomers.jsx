import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ShowCustomers = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/customers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    [customer.name, customer.email]
      .filter(Boolean)
      .some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(customers.filter((c) => c._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-xl font-bold">Customer List</h2>
        <Link
          to="/CustomerForm"
          className="text-white bg-black px-4 py-2 font-bold rounded text-center"
        >
          Add Customer
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 p-2 border rounded"
        />
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {currentItems.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul className="mb-4 flex flex-col gap-4">
          {currentItems.map((customer) => (
            <li key={customer._id} className="p-4 border rounded flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
              <div className="flex flex-col gap-1">
                <p><span className="font-semibold">Customer ID:</span> {customer._id}</p>
                <p><span className="font-semibold">Name:</span> {customer.name}</p>
                <p><span className="font-semibold">Email:</span> {customer.email}</p>
                <p><span className="font-semibold">Phone:</span> {customer.phone}</p>
                <p><span className="font-semibold">Company:</span> {customer.company || "N/A"}</p>
                <p><span className="font-semibold">Owner ID:</span> {customer.ownerId || "N/A"}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                <Link
                  to={`/leads/${customer._id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-green-600"
                >
                  View All Leads
                </Link>

                <Link
                  to={`/leadform?customerId=${customer._id}`}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Lead
                </Link>

                <button
                  onClick={() => navigate(`/CustomerForm/${customer._id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(customer._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowCustomers;
