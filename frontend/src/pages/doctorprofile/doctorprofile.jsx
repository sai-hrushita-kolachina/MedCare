import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./doctorprofile.css";

const aboutText = {
  "General Physician":
    "A General Physician specializes in diagnosing and treating a wide range of everyday health concerns, with a strong focus on preventive medicine and early detection.",
  "Cardiologist":
    "A Cardiologist is an expert in heart and blood-vessel-related conditions, offering precise diagnosis and advanced treatment for cardiovascular diseases.",
  "Dermatologist":
    "A Dermatologist focuses on skin, hair, and nail health, treating acne, allergies, pigmentation issues, infections, and chronic skin diseases.",
  "Gynecologist":
    "A Gynecologist is committed to women’s reproductive and hormonal health, providing care for menstrual issues, pregnancy, hormonal imbalance, and overall wellness.",
  "Neurologist":
    "A Neurologist treats conditions related to the brain, spinal cord, and nerves including migraines, seizures, memory problems, and neurological disorders.",
  "Pediatrician":
    "A Pediatrician ensures the health and development of infants, children, and teenagers through vaccinations, growth monitoring, and preventive care.",
  "Orthopedic":
    "An Orthopedic specialist manages bone, joint, muscle, and ligament conditions such as fractures, arthritis, and mobility issues.",
  "ENT Specialist":
    "An ENT Specialist treats conditions related to the ear, nose, and throat including allergies, sinus issues, hearing problems, and breathing difficulties.",
  "Dentist":
    "A Dentist is a skilled one dedicated to creating healthy, confident smiles. They provide gentle, modern dental care tailored to each patient’s needs.",
};

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toDateString()
  );

  const [selectedSlot, setSelectedSlot] = useState(null);

  const [availableSlots, setAvailableSlots] = useState([]);

  const [selectedConsultationType, setSelectedConsultationType] =
    useState(null);

  const proceedBtnRef = useRef(null);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/alldoctors/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDoctor(data);
      })
      .catch((err) => {
        console.log("Error fetching doctor:", err);
      });
  }, [id]);

  const getNext7Days = () => {
    const arr = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      arr.push({
        name: d.toLocaleDateString("en-US", {
          weekday: "short",
        }),

        number: d.getDate(),
        fullDate: d,
        dateString: d.toDateString(),
      });
    }
    return arr;
  };

  const next7Days = getNext7Days();

  const convert = (slot) => {
    let [time, mer] = slot.split(" ");
    let [h, m] = time.split(":");
    h = parseInt(h);

    if (mer === "PM" && h !== 12) {
      h += 12;
    }

    if (mer === "AM" && h === 12) {
      h = 0;
    }

    return `${h.toString().padStart(2, "0")}:${m}`;
  };


  useEffect(() => {
    if (!doctor || !selectedDate) {
      return;
    }

    const fetchAvailableSlots = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/sessions/available/${encodeURIComponent(
            doctor.name
          )}/${encodeURIComponent(selectedDate)}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch slots: ${response.status}`
          );
        }

        const data = await response.json();

        console.log("AVAILABLE SLOT RESPONSE:", data);

        if (!data.success) {
          setAvailableSlots([]);
          return;
        }

        let slots = data.slots || [];


        if (selectedDate === new Date().toDateString()) {
          const now = new Date();

          const currentTime =
            `${now.getHours().toString().padStart(2, "0")}:` +
            `${now.getMinutes().toString().padStart(2, "0")}`;

          slots = slots.filter(
            (slot) => convert(slot) > currentTime
          );
        }

        setAvailableSlots(slots);
        setSelectedSlot((currentSlot) => {
          if (currentSlot && !slots.includes(currentSlot)) {
            return null;
          }

          return currentSlot;
        });
      } catch (error) {
        console.log(
          "Error fetching available slots:",
          error
        );

        setAvailableSlots([]);
        setSelectedSlot(null);
      }
    };

    fetchAvailableSlots();
  }, [doctor, selectedDate]);


  if (!doctor) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }


  const handleProceed = () => {
    if (!selectedConsultationType || !selectedSlot) {
      proceedBtnRef.current.classList.add("shake");

      setTimeout(() => {
        proceedBtnRef.current.classList.remove(
          "shake"
        );
      }, 500);

      return;
    }

    navigate("/book-session", {
      state: {
        doctor,
        selectedDate,
        selectedTime: selectedSlot,
        selectedConsultationType,
      },
    });
  };

 

  return (
    <div className="doctor-profile-page">

      {/* DOCTOR INFORMATION */}

      <div className="doctor-main-box">
        <div className="doctor-main-content">

          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${doctor.image}`}
            alt={doctor.name}
            className="doctor-image"
          />

          <div className="doctor-details">

            <h2 className="doctor-name">
              {doctor.name}
            </h2>

            <p className="doctor-specialization">
              {doctor.speciality}
            </p>

            <p className="doctor-info">

              <strong>
                Experience:
              </strong>{" "}

              {doctor.experience}+ years

            </p>

            <p className="doctor-about">
              {aboutText[doctor.speciality]}
            </p>

          </div>

        </div>

      </div>

      {/*CONSULTATION + AVAILABILITY*/}

      <div className="consultation-wrapper">

        {/*LEFT SIDE*/}

        <div className="left-stack">

          <div className="doctor-right">

            <h3 className="consult-title">
              Online Consultation
            </h3>

            {/* AUDIO */}

            <button
              className={`consult-btn audio-btn ${
                selectedConsultationType === "Audio"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedConsultationType("Audio")
              }
            >
              Audio Consultation – ₹150
            </button>

            {/* VIDEO */}

            <button
              className={`consult-btn video-btn ${
                selectedConsultationType === "Video"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedConsultationType("Video")
              }
            >
              Video Consultation – ₹250
            </button>

            {/* CHAT */}

            <button
              className={`consult-btn chat-btn ${
                selectedConsultationType === "Chat"
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setSelectedConsultationType("Chat");
                navigate("/chatbot");
              }}
            >
              Chat With Healio (Free)
            </button>

          </div>

          {/*PROCEED BUTTON*/}

          <button
            ref={proceedBtnRef}
            className={`proceed-btn ${
              !selectedConsultationType ||
              !selectedSlot
                ? "disabled"
                : ""
            }`}
            onClick={handleProceed}
          >
            Proceed to Book Session
          </button>

        </div>

        {/*RIGHT SIDE*/}

        <div className="availability-box">

          <h3 className="availability-title">
            Doctor Availability
          </h3>

          {/*DATE LIST*/}

          <div className="date-list">

            {next7Days.map((item, index) => (

              <div
                key={index}

                className={`date-item ${
                  selectedDateIndex === index
                    ? "selected"
                    : ""
                }`}

                onClick={() => {
                  setSelectedSlot(null);

                  setSelectedDateIndex(index);

                  setSelectedDate(
                    item.dateString
                  );
                }}
              >

                <p className="day">
                  {item.name}
                </p>

                <p className="date">
                  {item.number}
                </p>

              </div>

            ))}

          </div>

          {/*TIME SLOTS*/}

          <div className="time-slots">

            {availableSlots.length === 0 ? (

              <p className="no-slots">
                No more slots available
              </p>

            ) : (

              availableSlots.map((slot, i) => (

                <button
                  key={`${slot}-${i}`}

                  className={`slot-btn ${
                    selectedSlot === slot
                      ? "slot-selected"
                      : ""
                  }`}

                  onClick={() =>
                    setSelectedSlot(slot)
                  }
                >
                  {slot}
                </button>

              ))

            )}

          </div>

          {/*SELECTED SLOT*/}

          {selectedSlot && (

            <p className="selected-info">

              Selected:{" "}

              <strong>
                {selectedDate}
              </strong>{" "}

              at{" "}

              <strong>
                {selectedSlot}
              </strong>

            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;