import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: clear auth data
    localStorage.removeItem("user"); 
    navigate("/"); // redirect to login page
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">Online Complaint and Grievance Portal</div>
        <div className="links">
          {/* Navigate to complaints page */}
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/complaints")}
          >
            Complaint
          </span>
          <span>Status</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
