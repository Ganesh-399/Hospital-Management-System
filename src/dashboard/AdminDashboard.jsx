import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import api from "../services/api";
import AdminHeader from "../components/AdminHeader";
import "./AdminDashboard.css";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
  });

  const [caseStatus, setCaseStatus] = useState({});
  const [doctorWise, setDoctorWise] = useState([]);
  const [monthlyCases, setMonthlyCases] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        statsRes,
        caseRes,
        doctorRes,
        monthRes,
        recentRes,
      ] = await Promise.all([
        api.get("/admin/dashboard/stats"),
        api.get("/admin/dashboard/case-status"),
        api.get("/admin/dashboard/doctor-wise-cases"),
        api.get("/admin/dashboard/monthly-cases"),
        api.get("/admin/dashboard/recent-appointments"),
      ]);

      setStats(statsRes.data);
      setCaseStatus(caseRes.data);
      setDoctorWise(doctorRes.data);
      setMonthlyCases(monthRes.data);
      setRecentAppointments(recentRes.data);
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ padding: 30 }}>Loading dashboard...</p>;
  }

  const pieData = {
    labels: Object.keys(caseStatus),
    datasets: [
      {
        data: Object.values(caseStatus),
        backgroundColor: ["#f59e0b", "#3b82f6", "#22c55e"],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: doctorWise.map((d) => d.doctor),
    datasets: [
      {
        label: "Cases",
        data: doctorWise.map((d) => d.count),
        backgroundColor: "#6366f1",
        borderRadius: 8,
      },
    ],
  };

  const monthLabels = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const monthlyMap = {};
  monthlyCases.forEach((m) => {
    monthlyMap[m.month] = m.count;
  });

  const lineData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Monthly Appointments",
        data: monthLabels.map((m) => monthlyMap[m] || 0),
        borderColor: "#7c3aed",
        backgroundColor: "rgba(124,58,237,0.15)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } },
  };

  return (
    <>
      {/* ===== ADMIN HEADER ===== */}
      <AdminHeader />

      <div className="dashboard" style={{ paddingTop: "90px" }}>
        {/* ================= STATS ================= */}
        <div className="stats-grid">
          <div className="stat-card gradient-blue">
            <h4>Total Doctors</h4>
            <p>{stats.doctors}</p>
          </div>
          <div className="stat-card gradient-purple">
            <h4>Total Patients</h4>
            <p>{stats.patients}</p>
          </div>
          <div className="stat-card gradient-pink">
            <h4>Appointments</h4>
            <p>{stats.appointments}</p>
          </div>
        </div>

        {/* ================= CHARTS ================= */}
        <div className="charts-grid">
          <div className="chart-card">
            <h4>Case Status</h4>
            <div className="chart-wrapper">
              <Pie data={pieData} />
            </div>
          </div>

          <div className="chart-card">
            <h4>Doctor-wise Cases</h4>
            <div className="chart-wrapper">
              <Bar data={barData} options={commonOptions} />
            </div>
          </div>

          <div className="chart-card">
            <h4>Monthly Appointments</h4>
            <div className="chart-wrapper">
              <Line data={lineData} options={commonOptions} />
            </div>
          </div>
        </div>

        {/* ================= RECENT APPOINTMENTS ================= */}
        <div className="chart-card" style={{ marginTop: "2rem" }}>
          <h4>Recent Appointments</h4>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Disease</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.patientName}</td>
                  <td>{a.doctorName}</td>
                  <td>{a.disease}</td>
                  <td>{a.date}</td>
                  <td>{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;