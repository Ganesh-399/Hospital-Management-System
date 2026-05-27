import { useEffect, useState } from "react";
import axios from "axios";
import "./Patients.css";

const API_BASE = "http://localhost:8080/api/admin";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const res = await axios.get(`${API_BASE}/patients`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPatients(res.data);
    } catch (err) {
      console.error("Failed to load patients", err);
    }
  };

  const viewPatientDetails = (patient) => {
    alert(
      `Patient Details\n\n` +
      `Name: ${patient.name}\n` +
      `Email: ${patient.email}`
    );
  };

  return (
    <div className="admin-table-page">
      <h2>Patients (Admin)</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No patients found
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>
                  <button
                    className="btn-view"
                    onClick={() => viewPatientDetails(patient)}
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

export default Patients;
