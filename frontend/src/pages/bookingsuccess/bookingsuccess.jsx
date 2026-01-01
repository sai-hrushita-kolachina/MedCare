import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./bookingsuccess.css";
import { notifyBookingSaved, notifyBookingFail } from "../../utils/toast";  

export default function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const sessionId =
    new URLSearchParams(location.search).get("sessionId") ||
    new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    const handleSuccess = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/payment/session/${sessionId}`
        );

        const paymentData = await res.json();
        console.log("PAYMENT DATA:", paymentData);

        if (!paymentData.success) {
          notifyBookingFail();     
          setLoading(false);
          return;
        }

        const patientName = paymentData.patientName;


        const doctorImage = paymentData.doctorImage
          ? `${import.meta.env.VITE_BACKEND_URL}${paymentData.doctorImage}`
          : `${import.meta.env.VITE_BACKEND_URL}/assets/default-doc.png`;

        const duplicateRes = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/sessions/check/${paymentData.paymentId}`
        );
        const exists = await duplicateRes.json();

        if (exists?.found) {
          console.log("Booking already exists. Skipping duplicate.");
          notifyBookingSaved();    
          setSaved(true);
          setLoading(false);
          return;
        }

        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/add`,{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentId: paymentData.paymentId,
            patientName,
            patientEmail: paymentData.patientEmail,
            doctorName: paymentData.doctorName,
            doctorImage,
            consultationType: paymentData.consultationType,
            date: paymentData.date,
            time: paymentData.time,
            status: "Confirmed",
          }),
        });

        notifyBookingSaved();        
        setSaved(true);
      } catch (err) {
        console.log("Error saving booking:", err);
        notifyBookingFail();       
      }

      setLoading(false);
    };

    handleSuccess();
  }, [sessionId]);

  if (loading) return <h2 className="loading">Finalizing your booking...</h2>;
  if (!saved) return <h2 className="loading">Something went wrong.</h2>;

  return (
    <div className="success-container">
      <div className="success-card">
        <h1>🎉 Payment Successful</h1>
        <p>Your session has been booked successfully.</p>

        <button
          className="success-btn"
          onClick={() => navigate("/my-bookings")}
        >
          View My Bookings
        </button>

        <button className="home-btn" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
}