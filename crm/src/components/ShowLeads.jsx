import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ShowLeads = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { customerId } = useParams();
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  useEffect(() => {
    const fetchLeads = async () => {
      setError("");
      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        if (!API_URL) {
          throw new Error("API_URL is not defined. Check your .env file.");
        }

        console.log("Fetching leads from:", `${API_URL}/api/leads/customer/${customerId}`);

        const res = await axios.get(
          `${API_URL}/api/leads/customer/${customerId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setLeads(res.data || []);
      } catch (err) {
        console.error("Error fetching leads:", err);
        setError(err.response?.data?.message || "Failed to fetch leads");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [customerId, API_URL]);

  // Pagination calculations
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) return <p className="text-center">Loading leads...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Leads for Customer ID: {customerId}
      </h1>

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      {leads.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">No leads found.</p>
          <button
            onClick={() => navigate(`/leadform?customerId=${customerId}`)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Lead
          </button>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {currentLeads.map((lead) => (
              <li
                key={lead._id}
                className="p-4 border rounded shadow bg-white"
              >
                <p>
                  <span className="font-semibold">Title:</span>{" "}
                  {lead.title || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {lead.description || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {lead.status || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Value:</span>{" "}
                  {lead.value || "N/A"}
                </p>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Add Lead Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate(`/leadform?customerId=${customerId}`)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Lead
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowLeads;
