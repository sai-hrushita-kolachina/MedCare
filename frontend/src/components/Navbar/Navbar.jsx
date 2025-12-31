import "./Navbar.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthModal from "../authModel/authModel";
import logo from "/logo.png"

function Navbar() {
  const [showAuth, setShowAuth] = useState(false);

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const updateUser = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    window.addEventListener("user-updated", updateUser);
    return () => window.removeEventListener("user-updated", updateUser);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.authRequired) {
      //eslint-disable-next-line
      setShowAuth(true);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="navbar">

        <div className="nav-left">
          <img src={logo} alt="MedCare Logo" className="logo-img" />
        </div>



        <ul className="nav-menu">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/chatbot" className={({ isActive }) => (isActive ? "active" : "")}>
              Chatbot
            </NavLink>
          </li>

          <li>
            <NavLink to="/doctors" className={({ isActive }) => (isActive ? "active" : "")}>
              Doctors
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
          </li>
        </ul>


        <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          ☰
        </div>

        <div className="nav-right">
          {user ? (
            <div
              className="profile-menu"
              onMouseEnter={() => setMenuOpen(true)}
            >
              <img
                src="/user.png"
                alt="profile"
                className="profile-icon"
                onClick={() => setMenuOpen(true)}
              />

              {menuOpen && (
                <div
                  className="menu-dropdown"
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <p onClick={() => navigate("/profile")}>My Profile</p>
                  <p onClick={() => navigate("/my-bookings")}>My Bookings</p>
                  <p onClick={handleLogout}>Log Out</p>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={() => setShowAuth(true)}>
              Sign in
            </button>
          )}
        </div>

      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink to="/chatbot" onClick={() => setMobileOpen(false)}>Chatbot</NavLink>
          <NavLink to="/doctors" onClick={() => setMobileOpen(false)}>Doctors</NavLink>
          <NavLink to="/about" onClick={() => setMobileOpen(false)}>About</NavLink>

          {!user && (
            <button
              className="mobile-login-btn"
              onClick={() => {
                setShowAuth(true);
                setMobileOpen(false);
              }}
            >
              Sign in
            </button>
          )}
        </div>
      )}

      {showAuth && <AuthModal show={showAuth} setShow={setShowAuth} />}
    </>
  );
}

export default Navbar;
