import "./PatientTopProfile.css";

const PatientTopProfile = ({ name, profilePhoto }) => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="topbar">
      <div className="profile-dropdown">
        <img
          src={
            profilePhoto
              ? `http://localhost:8080/uploads/profile/${profilePhoto}`
              : `https://ui-avatars.com/api/?name=${name || "Patient"}&background=22c55e&color=fff`
          }
          alt="Patient"
          className="avatar"
        />

        <span className="username">{name || "Patient"}</span>

        <div className="dropdown-menu">
          <button onClick={() => window.location.href = "/patient/profile"}>
            Profile
          </button>

          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientTopProfile;
