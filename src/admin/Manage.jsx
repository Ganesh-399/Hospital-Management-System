import { useEffect, useState } from "react";
import axios from "axios";
import "./Manage.css";

const API = "http://localhost:8080/api/admin/manage";

const Manage = () => {
  const [tab, setTab] = useState("DOCTOR");
  const [users, setUsers] = useState([]); 
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadUsers();
  }, [tab]);

  /* ================= LOAD USERS ================= */
  const loadUsers = async () => {
    try {
      const url =
        tab === "DOCTOR"
          ? `${API}/doctors`
          : `${API}/patients`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers(res.data);
    } catch (err) {
      console.error("Load users error:", err);
    }
  };

  /* ================= EDIT ================= */
 const startEdit = (u) => {
  setEditId(u.id);
  setForm({
    name: u.name,
    email: u.user?.email || "",
    phone: u.user?.phone || ""
  });
};


  const saveUser = async () => {
    try {
      const url =
        tab === "DOCTOR"
          ? `${API}/doctor/${editId}`
          : `${API}/patient/${editId}`;

      await axios.put(url, form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setEditId(null);
      loadUsers();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  /* ================= STATUS ================= */
  const toggleStatus = async (id) => {
    try {
      const url =
        tab === "DOCTOR"
          ? `${API}/doctor/${id}/toggle-status`
          : `${API}/patient/${id}/toggle-status`;

      await axios.put(url, null, {
        headers: { Authorization: `Bearer ${token}` }
      });

      loadUsers();
    } catch (err) {
      console.error("Toggle status error:", err);
    }
  };

  /* ================= DELETE ================= */
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API}/user/${id}`, {
        params: { role: tab },
        headers: { Authorization: `Bearer ${token}` }
      });

      loadUsers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  /* ================= VIEW DETAILS ================= */
  const viewDetails = async (id) => {
    try {
      const url =
        tab === "DOCTOR"
          ? `${API}/doctor/${id}/details`
          : `${API}/patient/${id}/details`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setDetails(res.data);
      setShowModal(true);
    } catch (err) {
      console.error("View details error:", err.response || err);
      alert("Failed to load details");
    }
  };

  /* ================= RESET PASSWORD ================= */
  const resetPassword = async () => {
    if (!newPassword) {
      alert("Enter new password");
      return;
    }

    // ✅ SAFE FIX (ONLY LOGIC CHANGE)
    const userId = details?.user?.id;
    if (!userId) {
      alert("User ID not found");
      return;
    }

    try {
      await axios.put(
        `${API}/user/${userId}/reset-password`,
        null,
        {
          params: { newPassword },
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Password reset successful");
      setNewPassword("");
    } catch (err) {
      console.error("Reset password error:", err);
    }
  };

  return (
    <div className="manage-container">
      <h2>Manage Doctors & Patients</h2>

      {/* TABS */}
      <div className="tabs">
        <button
          className={tab === "DOCTOR" ? "active" : ""}
          onClick={() => setTab("DOCTOR")}
        >
          Doctors
        </button>
        <button
          className={tab === "PATIENT" ? "active" : ""}
          onClick={() => setTab("PATIENT")}
        >
          Patients
        </button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>

              <td>
                {editId === u.id ? (
                  <input
                    value={form.name}
                    onChange={e =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                ) : u.name}
              </td>

              <td>
  {editId === u.id ? (
    <input
      value={form.email}
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
    />
  ) : u.user?.email}
</td>


             <td>
  {editId === u.id ? (
    <input
      value={form.phone}
      onChange={e =>
        setForm({ ...form, phone: e.target.value })
      }
    />
  ) : u.user?.phone || "—"}
</td>

<td>
  <span className={u.user?.enabled ? "active" : "inactive"}>
    {u.user?.enabled ? "Active" : "Disabled"}
  </span>
</td>


              <td>
                {editId === u.id ? (
                  <>
                    <button onClick={saveUser}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(u)}>Edit</button>
<button onClick={() => viewDetails(
 u.id
)}>
  View
</button>
                    
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DETAILS MODAL */}
      {showModal && details && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>👤 Profile Details</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            <div className="profile-details">
              {/* Profile Photo */}
              {details.profilePhoto && (
                <div className="profile-photo-section">
                  <img
                    src={`http://localhost:8080${details.profilePhoto}`}
                    alt="Profile"
                    className="profile-photo"
                  />
                </div>
              )}

              {/* Basic Info */}
              <div className="detail-section">
                <h4>📋 Basic Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Name</span>
                    <span className="value">{details.name || details.user?.name || "—"}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Email</span>
                    <span className="value">{details.user?.email || "—"}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Phone</span>
                    <span className="value">{details.user?.phone || "—"}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Role</span>
                    <span className="value role-badge">{details.user?.role || tab}</span>
                  </div>
                  <div className="detail-item"> 
                    <span className="label">Status</span>
                    <span className={`value status-badge ${details.user?.enabled ? "active" : "inactive"}`}>
                      {details.user?.enabled ? "Active" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Doctor-specific Info */}
              {tab === "DOCTOR" && (
                <div className="detail-section">
                  <h4>🩺 Professional Details</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Specialization</span>
                      <span className="value">{details.specialization || "—"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Qualification</span>
                      <span className="value">{details.qualification || "—"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Experience</span>
                      <span className="value">{details.experience ? `${details.experience} years` : "—"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Consultation Fee</span>
                      <span className="value fee">{details.consultationFee ? `$${details.consultationFee}` : "—"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Hospital</span>
                      <span className="value">{details.hospitalName || "—"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Available Timings</span>
                      <span className="value">{details.availableTimings || "—"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Patient-specific Info */}
              {tab === "PATIENT" && (
                <div className="detail-section">
                  <h4>🏥 Medical Details</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Age</span>
                      <span className="value">{details.age || "—"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Condition</span>
                      <span className="value">{details.disease || "—"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Blood Group</span>
                      <span className="value">{details.bloodGroup || "—"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Address</span>
                      <span className="value">{details.address || "—"}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Reset Password Section */}
            <div className="reset-password-section">
              <h4>🔐 Reset Password</h4>
              <div className="reset-password-form">
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <button className="reset-btn" onClick={resetPassword}>Reset Password</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;
