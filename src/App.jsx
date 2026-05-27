import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

/* ================= AUTH ================= */
import Login from "./auth/Login";
import RegisterSelect from "./auth/RegisterSelect";
import RegisterDoctor from "./auth/RegisterDoctor";
import RegisterPatient from "./auth/RegisterPatient";

/* ================= ADMIN ================= */
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./dashboard/AdminDashboard";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Appointments from "./admin/Appointments";
import Manage from "./admin/Manage";   // ✅ ADD THIS

/* ================= DOCTOR ================= */
import DoctorLayout from "./doctor/DoctorLayout";
import DoctorDashboard from "./dashboard/DoctorDashboard";
import DoctorAppointments from "./doctor/DoctorAppointments";
import DoctorProfile from "./doctor/DoctorProfile";
import DoctorPatientProfile from "./doctor/DoctorPatientProfile";

/* ================= PATIENT ================= */
import PatientLayout from "./patient/PatientLayout";
import PatientDashboard from "./patient/PatientDashboard";
import PatientProfile from "./patient/PatientProfile";
import BookAppointment from "./patient/BookAppointment";
import PatientNotifications from "./patient/PatientNotifications";

function App() {
  return (
    <Routes>

      {/* ================= AUTH ================= */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<RegisterSelect />} />
      <Route path="/register/doctor" element={<RegisterDoctor />} />
      <Route path="/register/patient" element={<RegisterPatient />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <PrivateRoute role="ADMIN">
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="patients" element={<Patients />} />
        <Route path="appointments" element={<Appointments />} />

        {/* ✅ MANAGE ROUTE */}
        <Route path="manage" element={<Manage />} />
      </Route>

      {/* ================= DOCTOR ================= */}
      <Route
        path="/doctor"
        element={
          <PrivateRoute role="DOCTOR">
            <DoctorLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DoctorDashboard />} />
        <Route path="profile" element={<DoctorProfile />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="patient/:patientId" element={<DoctorPatientProfile />} />
      </Route>

      {/* ================= PATIENT ================= */}
      <Route
        path="/patient"
        element={
          <PrivateRoute role="PATIENT">
            <PatientLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<PatientDashboard />} />
        <Route path="profile" element={<PatientProfile />} />
        <Route path="book" element={<BookAppointment />} />
        <Route path="notifications" element={<PatientNotifications />} />
      </Route>

    </Routes>
  );
}

export default App;
