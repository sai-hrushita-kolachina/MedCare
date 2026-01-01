import React, { useEffect, useState } from "react";
import "./myBookings.css";
import { notifyBookingCancelled, notifyBookingFail } from "../../utils/toast"; 

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchBookings = () => {
    if (!user?.email) return;
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/my-bookings/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBookings(data.bookings);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBookings();
    //eslint-disable-next-line
  }, []);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmCancel) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/sessions/cancel/${id}`,
        { method: "PATCH" }
      );

      if (!response.ok) {
        notifyBookingFail();   
        return;
      }

      notifyBookingCancelled(); 
      fetchBookings();        
    } catch (error) {
      console.log(error);
      notifyBookingFail();      
    }
  };

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        bookings.map((b, i) => (
          <div key={i} className="booking-card">

            <img src={b.doctorImage} alt="" className="doctor-photo" />

            <div className="booking-info">
              <h3>{b.doctorName}</h3>
              <p><strong>Consultation:</strong> {b.consultationType}</p>
              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Time:</strong> {b.time}</p>
            </div>

            <div className="booking-status">

              <span
                className={
                  b.status === "Cancelled"
                    ? "status-cancelled"
                    : "status-confirmed"
                }
              >
                {b.status}
              </span>

              {b.status !== "Cancelled" && (
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(b._id)}
                >
                  Cancel Booking
                </button>
              )}
            </div>

          </div>
        ))
      )}
    </div>
  );
}
