import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminDoctors.css";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/alldoctors`);
    setDoctors(res.data);
  };

  const deleteDoctor = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/alldoctors/${id}`);
    fetchDoctors();
  };

  useEffect(() => {
   //eslint-disable-next-line 
    fetchDoctors();
  }, []);

  return (
    <div className="admin-doctors-container">
      <h1 className="page-title">List Doctors</h1>

      <div className="doctor-table-wrapper">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Speciality</th>
              <th>Experience</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doc) => (
              <tr key={doc._id}>
                <td>
                  <img
                    src={
                      doc.image.startsWith("http")
                        ? doc.image
                        : `${import.meta.env.VITE_BACKEND_URL}${doc.image}`
                    }
                    alt="doctor"
                    className="doctor-table-img"
                  />
                </td>

                <td>{doc.name}</td>
                <td>{doc.speciality}</td>
                <td>{doc.experience} years</td>

                <td>
                  <button
                    className="delete-btn-table"
                    onClick={() => deleteDoctor(doc._id)}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
