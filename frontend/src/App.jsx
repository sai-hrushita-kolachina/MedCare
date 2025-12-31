import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/home";
import { AppContextProvider } from "./context/AppContext";
import Navbar from "./components/Navbar/Navbar.jsx";
import Chatbot from "./pages/chatbot/chatbot";
import Doctors from "./pages/doctors/doctors";
import About from "./pages/about/about";
import Footer from "./components/Footer/Footer";
import DoctorProfile from "./pages/doctorprofile/doctorprofile";
import BookSession from "./pages/booksession/booksession";
import BookingSuccess from "./pages/bookingsuccess/bookingsuccess";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MyBookings from "./pages/myBookings/myBookings.jsx";
import Profile from "./pages/profile/profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  const hideFooter = location.pathname === "/chatbot";
  return (
    <AppContextProvider>
      <div className="app">
        <Navbar />
        <div className="page-wrapper">
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:speciality" element={<Doctors />} />
            <Route path="/about" element={<About />} />
            <Route path="/doctorprofile/:id" element={<DoctorProfile />} />

            <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
            <Route path="/book-session" element={<ProtectedRoute><BookSession /></ProtectedRoute>} />
            <Route path="/booking-success" element={<ProtectedRoute><BookingSuccess /></ProtectedRoute>} />
            <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>

          </Routes>
        </div>

        {!hideFooter && <Footer />}
      </div>

      <ToastContainer position="top-center" autoClose={1500} />
    </AppContextProvider>
  );
}

export default App;
