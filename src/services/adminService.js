import axios from "axios";

const API = "http://localhost:8080/api/admin";

// 🔐 Auth header
const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

/* ================= DASHBOARD ================= */
export const getDashboardStats = () => {
  return axios.get(`${API}/dashboard`, {
    headers: authHeader(),
  });
};

/* ================= DOCTORS ================= */
export const getAllDoctors = () => {
  return axios.get(`${API}/doctors`, {
    headers: authHeader(),
  });
};

/* ================= PATIENTS ================= */
export const getAllPatients = () => {
  return axios.get(`${API}/patients`, {
    headers: authHeader(),
  });
};

/* ================= APPOINTMENTS ================= */
export const getAllAppointments = () => {
  return axios.get(`${API}/appointments`, {
    headers: authHeader(),
  });
};

export const updateAppointmentStatus = (id, status) => {
  return axios.put(
    `${API}/appointments/${id}/status?status=${status}`,
    {},
    {
      headers: authHeader(),
    }
  );
};
