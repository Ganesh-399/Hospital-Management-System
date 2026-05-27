import { useEffect, useState } from "react";
import api from "../services/api";
import { useToast } from "../components/Toast";
import "./DoctorAppointments.css";

const DoctorAppointments = () => {
  const toast = useToast();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState([]);

  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await api.get("/doctor/dashboard/appointments");
      setAppointments(res.data);
    } catch {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, action) => {
    try {
      await api.put(`/doctor/appointment/${id}/${action}`);
      if (action === "approve") {
        toast.success("Appointment approved successfully!");
      } else if (action === "decline") {
        toast.info("Appointment declined.");
      }
      loadAppointments();
    } catch {
      toast.error("Action failed. Please try again.");
    }
  };

  const openHistory = async (appointment) => {
    try {
      setPatient(appointment.patient);
      setShowHistoryModal(true);
      const res = await api.get(
        `/doctor/patient/${appointment.patient.id}/history`
      );
      setHistory(res.data);
    } catch {
      toast.error("Failed to load patient history");
    }
  };

  const saveDiagnosis = async () => {
    try {
      await api.put(
        `/doctor/appointment/${selectedAppointment.id}/diagnosis`,
        { diagnosis, prescription, notes }
      );
      setShowDiagnosisModal(false);
      setDiagnosis("");
      setPrescription("");
      setNotes("");
      toast.success("Diagnosis saved and appointment completed!");
      loadAppointments();
    } catch {
      toast.error("Failed to save diagnosis");
    }
  };

  if (loading) return <p className="loading">Loading appointments...</p>;

  return (
    <div className="page">
      <h2 className="heading">Doctor Appointments</h2>
      <p className="subheading">Review and manage patient appointment requests</p>

      {appointments.length === 0 ? (
        <div className="emptyBox">No appointments available</div>
      ) : (
        <div className="tableWrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Disease</th>
                <th>Date</th>
                <th>Time Slot</th> {/* ⭐ TIME SLOT */}
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td>#{a.id}</td>
                  <td>{a.patient.user.email}</td>
                  <td>{a.disease}</td>
                  <td>{a.date}</td>
                  <td>{a.timeSlot}</td> {/* ⭐ TIME SLOT */}
                  <td>
                    <span className={`status ${a.status.toLowerCase()}`}>
                      {a.status}
                    </span>
                  </td>
                  <td>
                    {a.status === "PENDING" && (
                      <>
                        <button className="btn approve" onClick={() => updateStatus(a.id, "approve")}>Approve</button>
                        <button className="btn decline" onClick={() => updateStatus(a.id, "decline")}>Decline</button>
                      </>
                    )}

                    {a.status === "PAID" && (
                      <button className="btn complete" onClick={() => {
                        setSelectedAppointment(a);
                        setShowDiagnosisModal(true);
                      }}>
                        Complete
                      </button>
                    )}

                    {a.status === "COMPLETED" && (
                      <button className="btn view" onClick={() => openHistory(a)}>
                        View Details
                      </button>
                    )}

                    {a.status === "DECLINED" && <span className="noAction">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* HISTORY MODAL */}
      {showHistoryModal && (
        <div className="modalOverlay">
          <div className="modal">
            <h3 className="modalTitle">Patient Medical History</h3>
            <p><b>Email:</b> {patient?.user?.email}</p>

            <table className="historyTable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time Slot</th> {/* ⭐ TIME SLOT */}
                  <th>Doctor</th>
                  <th>Disease</th>
                  <th>Diagnosis</th>
                  <th>Prescription</th>
                </tr>
              </thead>
              <tbody>
                {history.map(h => (
                  <tr key={h.id}>
                    <td>{h.date}</td>
                    <td>{h.timeSlot}</td> {/* ⭐ TIME SLOT */}
                    <td>{h.doctor.name}</td>
                    <td>{h.disease}</td>
                    <td>{h.diagnosis || "-"}</td>
                    <td>{h.prescription || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="btn close" onClick={() => setShowHistoryModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* DIAGNOSIS MODAL */}
      {showDiagnosisModal && (
        <div className="modalOverlay" onClick={() => setShowDiagnosisModal(false)}>
          <div className="diagnosis-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="diagnosis-header">
              <h2>Complete Appointment</h2>
              <button className="modal-close-btn" onClick={() => setShowDiagnosisModal(false)}>
                ✕
              </button>
            </div>

            {/* Patient Info Card */}
            <div className="diagnosis-body">
              <div className="patient-card">
                <div className="patient-avatar">
                  {(selectedAppointment?.patient?.user?.email || "P").charAt(0).toUpperCase()}
                </div>
                <div className="patient-info">
                  <h4>{selectedAppointment?.patient?.user?.email || "Patient"}</h4>
                  <span className="disease-badge">{selectedAppointment?.disease || "General Checkup"}</span>
                </div>
              </div>

              {/* Diagnosis Form */}
              <div className="diagnosis-form">
                <div className="form-field">
                  <label>
                    <span className="label-icon">🩺</span>
                    Diagnosis
                  </label>
                  <textarea
                    value={diagnosis}
                    onChange={e => setDiagnosis(e.target.value)}
                    placeholder="Enter your diagnosis for the patient's condition..."
                    rows={3}
                  />
                </div>

                <div className="form-field">
                  <label>
                    <span className="label-icon">💊</span>
                    Prescription
                  </label>
                  <textarea
                    value={prescription}
                    onChange={e => setPrescription(e.target.value)}
                    placeholder="Enter prescribed medications, dosages, and instructions..."
                    rows={3}
                  />
                </div>

                <div className="form-field">
                  <label>
                    <span className="label-icon">📝</span>
                    Additional Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Any additional notes, follow-up instructions, or recommendations..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="diagnosis-footer">
              <button className="btn-cancel" onClick={() => setShowDiagnosisModal(false)}>
                Cancel
              </button>
              <button className="btn-save" onClick={saveDiagnosis}>
                <span>✓</span> Save & Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
