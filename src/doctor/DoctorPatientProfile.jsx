import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const DoctorPatientProfile = () => {
  const { patientId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    loadPatient();
  }, []);

  const loadPatient = async () => {
    try {
      const res = await api.get(`/doctor/patient/${patientId}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load patient data");
    }
  };

  if (!data) return <p style={{ padding: 20 }}>Loading...</p>;

  const { patient, appointments } = data;

  return (
    <div style={{ padding: 30 }}>
      <h2>Patient Profile</h2>

      <div style={card}>
        <p><b>Name:</b> {patient.name}</p>
        <p><b>Email:</b> {patient.user.email}</p>
        <p><b>Phone:</b> {patient.user.phone}</p>
      </div>

      <h3>Appointment History</h3>

      <table style={table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Disease</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.disease}</td>
              <td>{a.date}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  marginBottom: 20,
};

const table = {
  width: "100%",
  background: "#fff",
  borderCollapse: "collapse",
};

export default DoctorPatientProfile;
