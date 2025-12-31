import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import TopDoctors from "../../components/TopDoctors/TopDoctors";
import "./home.css";

function Home() {
  const { getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    getDoctorsData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className = "app">
      <Header />
      <TopDoctors />
      <div className="healio-card">
        <div className="healio-left">
          <img src="/healio.png" alt="Healio" />
        </div>
      
        <div className="healio-middle">
          <h3>Hi I am Healio... How can I help you ? </h3>
          <p>Your personal AI health assistant is here to help you anytime.</p>
          <button onClick={() => navigate("/chatbot")}>
            Start Chat
          </button>
        </div>
      </div>


    </div>
  );
}

export default Home;
