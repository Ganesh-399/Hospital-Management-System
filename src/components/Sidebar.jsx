import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.sidebar}>
      <h2>HMS</h2>

      <button onClick={() => navigate("/admin")}>Dashboard</button>
      <button onClick={() => navigate("/admin/doctors")}>Doctors</button>
      <button onClick={() => navigate("/admin/patients")}>Patients</button>
      <button onClick={() => navigate("/admin/appointments")}>Appointments</button>
    </div>
  );
};

export default Sidebar;
