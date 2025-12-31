import React, { useState } from "react";
import axios from "axios";
import "./addDoctor.css";

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    experience: "",
  });

  const [file, setFile] = useState(null);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!file) return "";

    const data = new FormData();
    data.append("image", file);

    const res = await axios.post(
      "http://localhost:4000/api/upload",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return res.data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";

    if (file) {
      imageUrl = await uploadImage();
    }

    await axios.post("http://localhost:4000/api/alldoctors", {
      ...formData,
      image: imageUrl,
    });

    alert("Doctor added successfully!");

    setFormData({
      name: "",
      speciality: "",
      experience: "",
    });
    setFile(null);
  };

  return (
    <div className="add-doctor-container">
      <h1 className="page-title">Add Doctor</h1>

      <form className="add-doctor-box" onSubmit={handleSubmit}>

        <label className="form-label">Doctor Image</label>
        <div
          className="upload-box"
          onClick={() => document.getElementById("uploadInput").click()}
        >
          <img src="/upload-cloud.png" alt="upload" className="upload-icon" />
          <p>Upload</p>
        </div>

        <input
          id="uploadInput"
          type="file"
          hidden
          onChange={handleFileSelect}
        />

        <label className="form-label">Doctor Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="Enter name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <label className="form-label">Speciality</label>
        <input
          type="text"
          className="form-input"
          placeholder="Enter speciality"
          value={formData.speciality}
          onChange={(e) =>
            setFormData({ ...formData, speciality: e.target.value })
          }
        />

        <label className="form-label">Experience (Years)</label>
        <input
          type="number"
          className="form-input"
          placeholder="Enter experience"
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: e.target.value })
          }
        />

        <button className="submit-btn" type="submit">
          Add Doctor
        </button>
      </form>
    </div>
  );
}
