import React, { useEffect, useState } from "react";
import "./profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) 
        //eslint-disable-next-line
        setUser(JSON.parse(stored));
  }, []);

  if (!user) return <h2 className="loading">Loading profile...</h2>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        
        <img
          src={user.image ? `${import.meta.env.VITE_BACKEND_URL}${user.image}` : "/user.png"}
          alt="User"
          className="profile-img"
        />

        <h2 className="profile-name">{user.name}</h2>

        <div className="profile-details">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || "0000000000"}</p>
          <p><strong>Address:</strong> {user.address || "Not added"}</p>
          <p><strong>Gender:</strong> {user.gender || "Not Selected"}</p>
        </div>
        <button className="edit-btn"> Edit Profile </button>

      </div>
    </div>
  );
}
