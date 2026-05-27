import { useNavigate } from "react-router-dom";
import "./PatientHeader.css";
import NotificationBell from "../components/NotificationBell";

const PatientHeader = ({ patient, onLogout }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* TOP BAR WITH PROFILE & NOTIFICATIONS */}
      <div className="topbar-enhanced">
        <div className="topbar-content">
          <div className="logo-section">
            <div className="logo-icon">🏥</div>
            <span className="logo-text">HealthCare</span>
          </div>

          <div className="topbar-right">
            <NotificationBell />
            
            <div className="profile-dropdown-enhanced">
              <img
                src={
                  patient.profilePhoto
                    ? `http://localhost:8080/uploads/profile/${patient.profilePhoto}`
                    : `https://ui-avatars.com/api/?name=${patient.name || "Patient"}&background=667eea&color=fff&bold=true`
                }
                alt="Patient"
                className="avatar-enhanced"
              />

              <div className="user-info">
                <span className="username-enhanced">
                  {patient.name || "Patient"}
                </span>
                <span className="user-role">Patient</span>
              </div>

              <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              <div className="dropdown-menu-enhanced">
                <div className="dropdown-header">
                  <div className="dropdown-user-info">
                    <strong>{patient.name || "Patient"}</strong>
                    <span>{patient.email || "patient@example.com"}</span>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <button className="dropdown-item" onClick={() => navigate("/patient/profile")}>
                  <span className="item-icon">👤</span>
                  <span>My Profile</span>
                </button>

                

                <div className="dropdown-divider"></div>

                <button className="dropdown-item logout-item" onClick={onLogout}>
                  <span className="item-icon">🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE HEADER */}
      <div className="dashboard-header-enhanced">
        <div className="header-content">
          <div className="header-text">
            <h1>Welcome back, {patient.name?.split(' ')[0] || 'Patient'}! 👋</h1>
            <p>Track your appointments and manage your health journey</p>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default PatientHeader;