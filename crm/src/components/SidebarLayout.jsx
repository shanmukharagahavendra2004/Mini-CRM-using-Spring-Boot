import React from "react";
import { Link, Outlet } from "react-router-dom";

const SidebarLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">CRM</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="hover:text-lime-400">📊 Dashboard</Link>
          <Link to="/customers" className="hover:text-lime-400">👥 Customers</Link>
          <Link to="/customerform" className="hover:text-lime-400">➕ Add Customer</Link>
          <Link to="/leadform" className="hover:text-lime-400">➕ Add Lead</Link>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
