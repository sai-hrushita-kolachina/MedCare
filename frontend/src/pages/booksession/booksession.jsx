import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import "./booksession.css";
import { notifyBookingSaved, notifyBookingFail } from "../../utils/toast";

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXX");

const BookSession = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [patientName, setPatientName] = useState(user?.name || "");

  const { doctor, selectedDate, selectedTime, selectedConsultationType } =
    location.state || {};

  const price =
    selectedConsultationType === "Audio"
      ? 150
      : selectedConsultationType === "Video"
      ? 250
      : 0;

  const totalAmount = price + 10;

  return (
    <>
      <div className="top-summary">
        <p>
          <span><strong>Doctor:</strong> {doctor?.name}</span>
          <span><strong>Consultation Type:</strong> {selectedConsultationType}</span>
          <span><strong>Date:</strong> {selectedDate}</span>
          <span><strong>Time:</strong> {selectedTime}</span>
        </p>
      </div>

      <div className="booksession-container">
        <div className="details-section">
          <h2>Patient Information</h2>

          <form id="patientForm" className="patient-form">

            <div className="two-input-row">
              <input
                type="text"
                placeholder="First name"
                required
                onChange={(e) =>
                  setPatientName(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Last name"
                required
                onChange={(e) =>
                  setPatientName(
                    `${patientName.split(" ")[0] || ""} ${e.target.value}`
                  )
                }
              />
            </div>

            <input type="email" placeholder="Email address" className="full-input" required />
            <input type="text" placeholder="Street" className="full-input" required />

            <div className="two-input-row">
              <input type="text" placeholder="City" required />
              <input type="text" placeholder="State" required />
            </div>

            <div className="two-input-row">
              <input type="text" placeholder="Pin code" required />
              <input type="text" placeholder="Country" required />
            </div>

            <input type="text" placeholder="Phone" className="full-input" required />
          </form>
        </div>

        <div className="payment-section">
          <h3>Session Summary</h3>

          <div className="cart-totals">
            <div className="row">
              <span>Consultation Fee</span>
              <span>₹{price}</span>
            </div>

            <div className="row">
              <span>Platform Fee</span>
              <span>₹10</span>
            </div>

            <hr />

            <div className="row total">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <h3>Payment Method</h3>

          <div className="payment-method">
            <div className="payment-option">
              <input type="radio" disabled />
              <label>COD (Not Available)</label>
            </div>

            <div className="payment-option active">
              <input type="radio" checked readOnly />
              <label>Stripe (Credit / Debit)</label>
            </div>
          </div>

          <button
            className="place-order-btn"
            onClick={async () => {
              const form = document.getElementById("patientForm");

              if (!form.checkValidity()) {
                notifyBookingFail();
                form.reportValidity();
                return;
              }
              //eslint-disable-next-line
              const stripe = await stripePromise;

              const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-checkout-session`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    doctorName: doctor?.name,
                    doctorImage: doctor?.image,
                    consultationType: selectedConsultationType,
                    date: selectedDate,
                    time: selectedTime,
                    patientEmail: user?.email,
                    patientName: patientName, 
                    price: price
                  }),
                }
              );

              if (!response.ok) {
                notifyBookingFail();
                return;
              }

              const session = await response.json();
              notifyBookingSaved();
              window.location.href = session.url;
            }}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default BookSession;
