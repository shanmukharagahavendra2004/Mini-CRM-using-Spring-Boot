import './App.css';
import React from 'react';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import CustomerForm from './components/CustomerForm';
import Login from './components/Login';
import ShowCustomers from './components/ShowCustomers';
import ShowLeads from './components/ShowLeads';
import LeadsForm from './components/LeadsForm';
import Dashboard from './components/Dashboard';
import Home from './components/Home';   // ✅ Import Home
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SidebarLayout from './components/SidebarLayout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>     
        <Home /> 
        <Routes>
         <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />       
          <Route element={<SidebarLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customerform" element={<CustomerForm />} />
            <Route path="/customerform/:id" element={<CustomerForm />} />
            <Route path="/customers" element={<ShowCustomers />} />
            <Route path="/leads/:customerId" element={<ShowLeads />} />
            <Route path="/leadform" element={<LeadsForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
