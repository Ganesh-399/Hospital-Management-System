import { useEffect, useState } from "react";
import axios from "axios";
import "./Doctors.css";

const API_BASE = "http://localhost:8080/api/admin";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await axios.get(`${API_BASE}/doctors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDoctors(res.data);
    } catch (err) {
      console.error("Failed to load doctors", err);
    }
  };

  const toggleDoctorStatus = async (id) => {
    try {
      await axios.put(
        `${API_BASE}/doctor/${id}/toggle-status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      loadDoctors();
    } catch (err) {
      console.error("Failed to toggle doctor status", err);
    }
  };

  const viewDoctorDetails = (doctor) => {
    alert(
      `Doctor Details\n\n` +
      `Name: ${doctor.name}\n` +
      `Email: ${doctor.email}\n` +
      `Role: ${doctor.role}\n` +
      `Status: ${doctor.enabled ? "Enabled" : "Disabled"}`
    );
  };

  return (
    <div className="admin-table-page">
      <h2>Doctors (Admin)</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {doctors.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No doctors found
              </td>
            </tr>
          ) : (
            doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td className="role-doctor">{doctor.role}</td>

                <td
                  className={
                    doctor.enabled ? "status-active" : "status-inactive"
                  }
                >
                  {doctor.enabled ? "Enabled" : "Disabled"}
                </td>

                <td>
                  <button
                    className={
                      doctor.enabled ? "btn-disable" : "btn-enable"
                    }
                    onClick={() => toggleDoctorStatus(doctor.id)}
                  >
                    {doctor.enabled ? "Disable" : "Enable"}
                  </button>
                </td>

                <td>
                  <button
                    className="btn-view"
                    onClick={() => viewDoctorDetails(doctor)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Doctors;
