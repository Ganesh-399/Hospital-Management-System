import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">HMS Admin</h2>

      <NavLink to="/admin/dashboard">Dashboard</NavLink>
      <NavLink to="/admin/doctors">Doctors</NavLink>
      <NavLink to="/admin/patients">Patients</NavLink>
      <NavLink to="/admin/appointments">Appointments</NavLink>
      <NavLink to="/admin/Manage">Manage Data</NavLink>
    </div>
  );
};

export default Sidebar;
