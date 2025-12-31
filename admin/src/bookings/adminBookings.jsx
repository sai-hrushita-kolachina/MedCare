import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminBookings.css";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/sessions/all");
      setBookings(res.data);
    } catch (err) {
      console.log("Error fetching bookings:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:4000/api/sessions/status/${id}`,
        { status }
      );
      fetchBookings();
    } catch (err) {
      console.log("Error updating status:", err);
    }
  };

  useEffect(() => {
    //eslint-disable-next-line
    fetchBookings();
  }, []);

  return (
    <div className="admin-bookings-container">
      <h1 className="page-title">Bookings</h1>

      {bookings.map((b) => (
        <div key={b._id} className="booking-card">
          
          {/* LEFT SIDE */}
          <div className="booking-left">

            <img
              src={
                b.doctorImage?.startsWith("http")
                  ? b.doctorImage
                  : `http://localhost:4000${b.doctorImage}`
              }
              alt="doctor"
              className="booking-doctor-img"
            />

            <div className="booking-info">
              <h2>{b.doctorName}</h2>

              <p><strong>Patient:</strong> {b.patientName}</p>
              <p><strong>Email:</strong> {b.patientEmail}</p>
              <p><strong>Consultation:</strong> {b.consultationType}</p>

              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Time:</strong> {b.time}</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="booking-status">
            <select
              className="status-dropdown"
              value={b.status}
              onChange={(e) => updateStatus(b._id, e.target.value)}
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
