import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [statusData, setStatusData] = useState([]);
  const [valueData, setValueData] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/leads", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const leads = res.data;

        // ✅ Group by status
        const statusCounts = leads.reduce((acc, lead) => {
          acc[lead.status] = (acc[lead.status] || 0) + 1;
          return acc;
        }, {});

        setStatusData(
          Object.entries(statusCounts).map(([status, count]) => ({
            name: status,
            value: count,
          }))
        );

        // ✅ Group by value
        const valueCounts = leads.reduce((acc, lead) => {
          const val = lead.value || 0;
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        }, {});

        setValueData(
          Object.entries(valueCounts).map(([val, count]) => ({
            name: `$${val}`,
            value: count,
          }))
        );
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Pie chart by Status */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4">Leads by Status</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            dataKey="value"
          >
            {statusData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Bar chart by Value */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4">Leads by Value</h2>
        <BarChart width={400} height={300} data={valueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#0088FE" />
        </BarChart>
      </div>
    </div>
  );
};

export default Dashboard;
