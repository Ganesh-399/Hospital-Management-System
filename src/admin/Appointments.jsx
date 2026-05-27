import { useEffect, useState } from "react";
import axios from "axios";
import "./Appointments.css";

const API_BASE = "http://localhost:8080/api/admin";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/appointments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to load appointments", err);
    }
  };

  const updateStatus = async (id) => {
    try {
      await axios.put(
        `${API_BASE}/appointments/${id}/status?status=COMPLETED`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      loadAppointments();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const viewAppointmentDetails = (a) => {
    alert(
      `Appointment Details\n\n` +
      `Appointment ID: ${a.id}\n` +
      `Patient: ${a.patient?.name || a.patient?.username || "N/A"}\n` +
      `Doctor: ${a.doctor?.name || a.doctor?.username || "N/A"}\n` +
      `Date: ${a.date}\n` +
      `Status: ${a.status}`
    );
  };

  return (
    <div className="admin-table-page">
      <h2>Appointments</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No appointments found
              </td>
            </tr>
          ) : (
            appointments.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>

                <td>
                  {a.patient?.name || a.patient?.username || "N/A"}
                </td>

                <td>
                  {a.doctor?.name || a.doctor?.username || "N/A"}
                </td>

                <td>{a.date}</td>

                <td>
                  <span
                    className={`status-badge status-${a.status.toLowerCase()}`}
                  >
                    {a.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn-complete"
                    onClick={() => updateStatus(a.id)}
                    disabled={a.status === "COMPLETED"}
                  >
                    Complete
                  </button>
                </td>

                <td>
                  <button
                    className="btn-view"
                    onClick={() => viewAppointmentDetails(a)}
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

export default Appointments;
