import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../components/Toast";
import PaymentModal from "../components/PaymentModal";
import "./PatientDashboard.css";
import PatientHeader from "./PatientHeader";

const API = "http://localhost:8080/api/patient";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState({
    name: "",
    profilePhoto: "",
  });

  // Payment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Prescription Modal State
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    loadAppointments();
    loadPatientProfile();
  }, []);

  /* ================= LOAD DATA ================= */

  const loadAppointments = async () => {
    try {
      const res = await axios.get(`${API}/appointments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to load appointments", err);
    }
  };

  const loadPatientProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/profile/patient", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPatient({
        name: res.data.user?.name,
        profilePhoto: res.data.profilePhoto,
      });
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  /* ================= PAYMENT ================= */

  const openPaymentModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    loadAppointments();
    toast.success("Payment successful! Your appointment is confirmed.");
  };

  /* ================= PRESCRIPTION ================= */

  const openPrescriptionModal = (appointment) => {
    setSelectedPrescription(appointment);
    setShowPrescriptionModal(true);
  };

  /* ================= HELPERS ================= */

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const count = (status) =>
    appointments.filter((a) => a.status === status).length;

  /* ================= UI ================= */

  return (
    <div className="patient-dashboard">
      {/* HEADER */}
      <PatientHeader patient={patient} onLogout={logout} />

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <span>📋 Total Appointments</span>
          <h2>{appointments.length}</h2>
        </div>

        <div className="stat-card orange">
          <span>⏳ Pending</span>
          <h2>{count("PENDING")}</h2>
        </div>

        <div className="stat-card purple">
          <span>✅ Approved</span>
          <h2>{count("APPROVED")}</h2>
        </div>

        <div className="stat-card green">
          <span>🎉 Completed</span>
          <h2>{count("COMPLETED")}</h2>
        </div>
      </div>

      {/* TABLE HEADER */}
      <div className="table-header">
        <h2>My Appointments</h2>
        <button className="book-btn" onClick={() => navigate("/patient/book")}>
          + Book Appointment
        </button>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Disease</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.doctorName || "—"}</td>
                  <td>{a.disease}</td>
                  <td>{a.date}</td>
                  <td>
                    <span className={`status ${a.status.toLowerCase()}`}>
                      {a.status}
                    </span>
                  </td>

                  {/* 💳 ACTIONS */}
                  <td>
                    {a.status === "APPROVED" ? (
                      <button
                        className="pay-btn"
                        onClick={() => openPaymentModal(a)}
                      >
                        💳 Pay Now
                      </button>
                    ) : a.status === "PAID" ? (
                      <span className="paid-badge">✓ Paid</span>
                    ) : a.status === "COMPLETED" ? (
                      <button
                        className="view-details-btn"
                        onClick={() => openPrescriptionModal(a)}
                      >
                        📋 View Details
                      </button>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAYMENT MODAL */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        appointmentId={selectedAppointment?.id}
        amount={selectedAppointment?.amount || 10.0}
        onPaymentSuccess={handlePaymentSuccess}
        toast={toast}
      />

      {/* PRESCRIPTION MODAL */}
      {showPrescriptionModal && selectedPrescription && (
        <div className="prescription-modal-overlay" onClick={() => setShowPrescriptionModal(false)}>
          <div className="prescription-modal" onClick={(e) => e.stopPropagation()}>
            <div className="prescription-modal-header">
              <h2>📋 Prescription Details</h2>
              <button className="close-btn" onClick={() => setShowPrescriptionModal(false)}>×</button>
            </div>

            <div className="prescription-modal-body">
              <div className="prescription-info-row">
                <span className="info-label">Doctor</span>
                <span className="info-value">{selectedPrescription.doctorName}</span>
              </div>

              <div className="prescription-info-row">
                <span className="info-label">Date</span>
                <span className="info-value">{selectedPrescription.date}</span>
              </div>

              <div className="prescription-info-row">
                <span className="info-label">Condition</span>
                <span className="info-value">{selectedPrescription.disease}</span>
              </div>

              <div className="prescription-section">
                <h3>🩺 Diagnosis</h3>
                <p>{selectedPrescription.diagnosis || "No diagnosis provided"}</p>
              </div>

              <div className="prescription-section">
                <h3>💊 Prescription</h3>
                <p>{selectedPrescription.prescription || "No prescription provided"}</p>
              </div>

              <div className="prescription-section">
                <h3>📝 Notes</h3>
                <p>{selectedPrescription.notes || "No additional notes"}</p>
              </div>
            </div>

            <div className="prescription-modal-footer">
              <button className="close-modal-btn" onClick={() => setShowPrescriptionModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
