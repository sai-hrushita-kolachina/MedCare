import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./login/adminLogin";
import AdminLayout from "./layout/adminLayout";

import AddDoctor from "./addDoctor/addDoctor";
import AdminDoctors from "./doctors/adminDoctors";
import AdminBookings from "./bookings/adminBookings";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctors" element={<AdminDoctors />} />
            <Route path="/bookings" element={<AdminBookings />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
