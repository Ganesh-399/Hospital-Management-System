import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./PatientLayout.css";
import { color } from "chart.js/helpers";

const PatientLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="patient-layout">
      <aside className="patient-sidebar">
        {/* BRAND */}
       <div
  className="sidebar-header"
  style={{
    padding: "24px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  }}
>
  <h2
    style={{
      margin: 0,
      fontSize: "24px",
      fontWeight: 700,
      color: "#ffffff",
      letterSpacing: "0.5px",
    }}
  >
    Patient
  </h2>

  <p
    style={{
      margin: "6px 0 0",
      fontSize: "13px",
      fontWeight: 500,
      color: "rgba(255,255,255,0.7)",
      letterSpacing: "0.3px",
    }}
  >
    Health Portal
  </p>
</div>


        {/* NAV */}
        <nav className="sidebar-nav">
          <button
            className={location.pathname === "/patient" ? "active" : ""}
            onClick={() => navigate("/patient")}
          >
            Dashboard
          </button>

          {/* ✅ NEW: PROFILE */}
          <button
            className={location.pathname === "/patient/profile" ? "active" : ""}
            onClick={() => navigate("/patient/profile")}
          >
            My Profile
          </button>

          <button
            className={location.pathname === "/patient/book" ? "active" : ""}
            onClick={() => navigate("/patient/book")}
          >
            Book Appointment
          </button>
        </nav>

        {/* LOGOUT */}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="patient-content">
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout;
