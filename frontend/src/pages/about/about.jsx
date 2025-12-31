import React from "react";
import "./about.css";
import aboutImg from "../../assets/about.png"; 

const About = () => {
  return (
    <div className="about-wrapper">

      <div className="about-left">
        <img
          src={aboutImg}
          alt="MedCare"
          className="about-image"
        />
      </div>


      <div className="about-right">
        <h1 className="about-title">
          About <span>MedCare</span>
        </h1>

        <p className="about-desc">
          MedCare is an advanced AI-powered healthcare platform built to make
          medical assistance more accessible, reliable, and effortless for
          everyone. We help you understand your symptoms, identify possible
          health conditions, and instantly connect you with the right specialist
          — all from the comfort of your home.
        </p>

        <p className="about-desc">
          With modern healthcare becoming increasingly complex, MedCare
          simplifies the journey for every user by offering accurate AI
          predictions, verified datasets, and seamless appointment scheduling.
          Whether you're seeking clarity about a symptom or booking a doctor’s
          slot, our mission is to bring trust, speed, and transparency to your
          healthcare experience.
        </p>

        <h2 className="about-subtitle">Our Mission</h2>
        <p className="about-text">
          To revolutionize everyday healthcare using the power of artificial
          intelligence. We aim to empower individuals with reliable health
          insights, reduce uncertainty, and bridge the gap between patients and
          specialists through smart technology.
        </p>

        <p className="about-text">
          We believe that the right information at the right time can transform
          lives. MedCare ensures that every user receives guidance backed by
          medical science, modern predictive models, and user-friendly
          interfaces.
        </p>

        <h2 className="about-subtitle">What Makes Us Different?</h2>

        <ul className="about-list">
          <li>AI model trained on 400+ diseases and thousands of symptoms</li>
          <li>Accurate symptom-to-specialist mapping for better decisions</li>
          <li>Expert doctors from multiple specialties in one place</li>
          <li>Instant session booking with real-time slot availability</li>
          <li>Clean, simple, and trustworthy UI suitable for all age groups</li>
          <li>Backed by verified medical datasets and clinical guidelines</li>
          <li>Focused on accessibility, speed, and user convenience</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
