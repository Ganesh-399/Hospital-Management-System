import { useEffect, useState } from "react";
import axios from "axios";
import "./DoctorProfile.css";

const API = "http://localhost:8080/api/profile";

const DoctorProfile = () => {
  const [profile, setProfile] = useState({
    specialization: "",
    qualification: "",
    experience: "",
    consultationFee: "",
    hospitalName: "",
    availableTimings: "",
    user: {
      name: "",
      email: "",
      phone: ""
    }
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadProfile();
  }, []);

  /* ================= LOAD PROFILE ================= */
  const loadProfile = async () => {
    try {
      const res = await axios.get(`${API}/doctor`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data) setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    setLoading(true);
    try {
      await axios.post(`${API}/doctor`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CHANGE PASSWORD ================= */
  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      alert("Please enter both old and new password");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/change-password`,
        null,
        {
          params: { oldPassword, newPassword },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert(res.data);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data);
      } else {
        alert("Password change failed");
      }
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="card-header">
          <h2>Doctor Profile Settings</h2>
          <p>Manage your account settings and preferences.</p>
        </div>

        {/* --- SECTION 1: PERSONAL DETAILS --- */}
        <div className="form-section">
          <h3 className="section-title">Personal Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={profile.user.name}
                onChange={e =>
                  setProfile({
                    ...profile,
                    user: { ...profile.user, name: e.target.value }
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={profile.user.email} disabled className="input-disabled" />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={profile.user.phone}
                onChange={e =>
                  setProfile({
                    ...profile,
                    user: { ...profile.user, phone: e.target.value }
                  })
                }
              />
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* --- SECTION 2: PROFESSIONAL INFO --- */}
        <div className="form-section">
          <h3 className="section-title">Professional Info</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Specialization</label>
              <input value={profile.specialization} disabled className="input-disabled" />
            </div>

            <div className="form-group">
              <label>Qualification</label>
              <input
                value={profile.qualification}
                onChange={e =>
                  setProfile({ ...profile, qualification: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Experience (Years)</label>
              <input
                type="number"
                value={profile.experience}
                onChange={e =>
                  setProfile({ ...profile, experience: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Consultation Fee (₹)</label>
              <input
                type="number"
                value={profile.consultationFee}
                onChange={e =>
                  setProfile({ ...profile, consultationFee: e.target.value })
                }
              />
            </div>

            <div className="form-group full-width">
              <label>Hospital / Clinic Name</label>
              <input
                value={profile.hospitalName}
                onChange={e =>
                  setProfile({ ...profile, hospitalName: e.target.value })
                }
              />
            </div>

            
          </div>

          <div className="action-row">
            <button className="btn-primary" onClick={saveProfile} disabled={loading}>
              {loading ? "Saving..." : "Save Profile Changes"}
            </button>
          </div>
        </div>

        <hr className="divider" />

        {/* --- SECTION 3: SECURITY --- */}
        <div className="form-section security-section">
          <h3 className="section-title">Security</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="action-row">
            <button className="btn-secondary" onClick={changePassword}>
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;