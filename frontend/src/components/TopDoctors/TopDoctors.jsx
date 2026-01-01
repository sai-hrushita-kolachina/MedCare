import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "./TopDoctors.css";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { allDoctors, getAllDoctors } = useContext(AppContext);

  useEffect(() => {
    getAllDoctors();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="topdoctors-container">
      <h1 className="td-title">Top Doctors You Can Trust</h1>
      <p className="td-subtitle">Experienced specialists dedicated to your well-being.</p>

      <div className="td-grid">
        {allDoctors.slice(0, 10).map((doctor) => (
          <div
            key={doctor._id}
            className="td-card"
            onClick={() => navigate(`/doctorprofile/${doctor._id}`)}
          >
            <div className="td-image-wrapper">
              <img
                src={
                  doctor.image.startsWith("http")
                    ? doctor.image
                    : `${import.meta.env.VITE_BACKEND_URL}${doctor.image}`
                }
                alt={doctor.name}
                className="td-image"
              />
            </div>

            <div className="td-info">
              <p className="td-name">{doctor.name}</p>
              <p className="td-speciality">{doctor.speciality}</p>
              <p className="td-exp">{doctor.experience}+ years experience</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="td-more-btn"
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
      >
        View All Doctors
      </button>
    </div>
  );
};

export default TopDoctors;
