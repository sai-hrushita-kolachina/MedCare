import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import "./doctors.css";

const Doctors = () => {
  const { allDoctors, getAllDoctors } = useContext(AppContext);
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [selectedSpeciality, setSelectedSpeciality] = useState("All");

  const slugToName = {
    "cardiologist": "Cardiologist",
    "dermatologist": "Dermatologist",
    "general-physician": "General Physician",
    "gynecologist": "Gynecologist",
    "neurologist": "Neurologist",
    "pediatrician": "Pediatrician",
    "orthopedic": "Orthopedic",
    "ent-specialist": "ENT Specialist",
  };

  useEffect(() => {
    getAllDoctors();
  
    if (speciality && slugToName[speciality]) {
      setSelectedSpeciality(slugToName[speciality]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speciality, getAllDoctors]);

  const filteredDoctors =
    selectedSpeciality === "All"
      ? allDoctors
      : allDoctors.filter((doc) => doc.speciality === selectedSpeciality);

  return (
    <div className="topdoctors-container">

      <div className="speciality-filter-inline">
        {[
          "All",
          "Cardiologist",
          "Dermatologist",
          "General Physician",
          "Gynecologist",
          "Neurologist",
          "Pediatrician",
          "Orthopedic",
          "ENT Specialist",
        ].map((spec, index) => (
          <button
            key={index}
            className={`filter-btn-inline ${selectedSpeciality === spec ? "active" : ""}`}
            onClick={() => {
              setSelectedSpeciality(spec);

              const slug = spec.toLowerCase().replace(/ /g, "-");
              if (spec === "All") {
                navigate("/doctors");
              } else {
                navigate(`/doctors/${slug}`);
              }
            }}
          >
            {spec}
          </button>
        ))}
      </div>

      <h1 className="td-title">All Doctors</h1>
      <p className="td-subtitle">Explore our dedicated team of expert healthcare professionals.</p>

      <div className="td-grid">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor._id}
            className="td-card"
            onClick={() => navigate(`/doctorprofile/${doctor._id}`)}
          >
            <div className="td-image-wrapper">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${doctor.image}`}
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
    </div>
  );
};

export default Doctors;
