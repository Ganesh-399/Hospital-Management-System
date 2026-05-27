import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./DoctorLayout.css";

const API = "http://localhost:8080/api/profile";

const DoctorLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const [doctor, setDoctor] = useState({
    user: { name: "" },
    profilePhoto: "",
  });

  useEffect(() => {
    loadDoctor();
  }, []);

  const loadDoctor = async () => {
    try {
      const res = await axios.get(`${API}/doctor`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) setDoctor(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="doctor-layout">
      
      {/* ===== SIDEBAR ===== */}
      <aside className="doctor-sidebar">
        <h2 className="logo">Doctor Portal</h2>

        <nav className="sidebar-menu">
          <button
            className={location.pathname === "/doctor" ? "active" : ""}
            onClick={() => navigate("/doctor")}
          >
            Dashboard
          </button>

          <button
            className={location.pathname === "/doctor/profile" ? "active" : ""}
            onClick={() => navigate("/doctor/profile")}
          >
            My Profile
          </button>

          <button
            className={location.pathname === "/doctor/appointments" ? "active" : ""}
            onClick={() => navigate("/doctor/appointments")}
          >
            Appointments
          </button>
        </nav>

        {/* 🔴 LOGOUT AT BOTTOM */}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="doctor-main">
        <main className="doctor-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
