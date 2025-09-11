import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        CRM System
      </Link>

      <nav className="flex gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to='/dashboard'>Dashboard</Link>
        
        {token && (role === "admin" || role === "user") && (
          <Link to="/customers" className="hover:underline">Customers</Link>
        )}

      
        {token && (role === "admin" || role === "user") && (
          <Link to="/cases" className="hover:underline">Cases</Link>
        )}

        
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:underline">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
