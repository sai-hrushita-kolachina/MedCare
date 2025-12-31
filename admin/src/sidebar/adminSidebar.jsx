import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./adminSidebar.css";
import { AppContext } from "../context/AppContext";

export default function AdminSidebar() {
  const { adminLogout } = useContext(AppContext);

  return (
    <div className="admin-sidebar">

      <h2>MedCare Admin</h2>
      <NavLink to="/add-doctor" className="sidebar-link">Add Doctor</NavLink>
      <NavLink to="/doctors" className="sidebar-link">List Doctors</NavLink>
      <NavLink to="/bookings" className="sidebar-link">Bookings</NavLink>
      <button className="admin-logout-btn" onClick={adminLogout}>
        Logout
      </button>
    </div>
  );
}
