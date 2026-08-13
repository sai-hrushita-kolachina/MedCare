import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./bookingsuccess.css";
import {
  notifyBookingSaved,
  notifyBookingFail,
} from "../../utils/toast";

export default function BookingSuccess() {

  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const sessionId =
    new URLSearchParams(location.search).get("sessionId") ||
    new URLSearchParams(location.search).get("session_id");

  useEffect(() => {

    if (!sessionId) {
      //eslint-disable-next-line
      setLoading(false);
      return;
    }


    const handleSuccess = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/payment/session/${sessionId}`
        );

        const paymentData = await res.json();
        console.log(
          "PAYMENT DATA:",
          paymentData
        );


        if (!paymentData.success) {

          notifyBookingFail();

          setLoading(false);

          return;
        }

        const doctorImage =
          paymentData.doctorImage
            ? `${import.meta.env.VITE_BACKEND_URL}${paymentData.doctorImage}`
            : `${import.meta.env.VITE_BACKEND_URL}/assets/default-doc.png`;

        const duplicateRes = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/sessions/check/${paymentData.paymentId}`
        );
        const exists = await duplicateRes.json();

        if (exists?.found) {
          console.log(
            "Booking already exists. Skipping duplicate."
          );

          notifyBookingSaved();

          setSaved(true);
          setLoading(false);
          return;
        }


        const saveRes = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/sessions/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({

              paymentId:
                paymentData.paymentId,

              patientName:
                paymentData.patientName,

              patientEmail:
                paymentData.patientEmail,

              doctorName:
                paymentData.doctorName,

              doctorImage,

              consultationType:
                paymentData.consultationType,

              date:
                paymentData.date,

              time:
                paymentData.time,

              status:
                "Confirmed",

            }),
          }
        );



        const saveData =
          await saveRes.json();
        if (
          !saveRes.ok ||
          !saveData.success
        ) {

          console.log(
            "Booking was not saved:",
            saveData
          );

          notifyBookingFail();

          setSaved(false);

          setLoading(false);

          return;
        }


        notifyBookingSaved();
        setSaved(true);

      } catch (err) {

        console.log(
          "Error saving booking:",
          err
        );

        notifyBookingFail();
        setSaved(false);
      }
      setLoading(false);
    };
    handleSuccess();

  }, [sessionId]);

  if (loading) {
    return (
      <main className="booking-main-container">
        <h2 className="loading">
          Finalizing your booking...
        </h2>
      </main>
    );
  }


  if (!saved) {
    return (
      <div className="success-container">
        <div className="success-card">
          <h1>
            Booking could not be completed
          </h1>

          <p>
            This slot may have been booked
            by another user.
          </p>

          <button
            className="success-btn"
            onClick={() =>
              navigate("/")
            }
          >
            Go Back
          </button>

        </div>

      </div>
    );
  }



  // SUCCESS
  return (
    <div className="success-container">
      <div className="success-card">
        <h1>
          🎉 Payment Successful
        </h1>

        <p>
          Your session has been booked
          successfully.
        </p>

        <button
          className="success-btn"
          onClick={() =>
            navigate("/my-bookings")
          }
        >
          View My Bookings
        </button>

        <button
          className="home-btn"
          onClick={() =>
            navigate("/")
          }
        >
          Go to Home
        </button>

      </div>

    </div>

  );

}