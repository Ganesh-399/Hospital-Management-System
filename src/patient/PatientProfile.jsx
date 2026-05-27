import { useEffect, useState } from "react";
import axios from "axios";
import "./PatientProfile.css";

const API = "http://localhost:8080/api/profile";

const PatientProfile = () => {
  const [profile, setProfile] = useState({
    age: "",
    disease: "",
    gender: "",
    bloodGroup: "",
    address: "",
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
      const res = await axios.get(`${API}/patient`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data) setProfile(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load profile");
    }
  };

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    setLoading(true);
    try {
      await axios.post(`${API}/patient`, profile, {
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
          <h2>Patient Profile</h2>
          <p>Update your personal information and medical history.</p>
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

            <div className="form-group full-width">
              <label>Residential Address</label>
              <textarea
                rows="2"
                value={profile.address}
                onChange={e =>
                  setProfile({ ...profile, address: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* --- SECTION 2: MEDICAL INFORMATION --- */}
        <div className="form-section">
          <h3 className="section-title">Medical Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                value={profile.age}
                onChange={e =>
                  setProfile({ ...profile, age: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                value={profile.gender}
                onChange={e =>
                  setProfile({ ...profile, gender: e.target.value })
                }
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Blood Group</label>
              <select
                value={profile.bloodGroup}
                onChange={e =>
                  setProfile({ ...profile, bloodGroup: e.target.value })
                }
              >
                <option value="">Select Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="form-group">
              <label>Current Disease / Condition</label>
              <input
                type="text"
                value={profile.disease}
                onChange={e =>
                  setProfile({ ...profile, disease: e.target.value })
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

export default PatientProfile;