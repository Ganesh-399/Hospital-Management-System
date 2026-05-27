import { useEffect, useState } from "react";
import api from "../services/api";
import NotificationBell from "../components/NotificationBell";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    completed: 0,
    totalEarnings: 0,
    totalPatients: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const statsRes = await api.get("/doctor/dashboard/stats");
      setStats(statsRes.data);
    } catch (err) {
      console.error("Dashboard data error", err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return `$${Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (loading) {
    return (
      <div className="doctor-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>👨‍⚕️ Doctor Dashboard</h1>
          <p>Overview of your appointments, patients, and earnings</p>
        </div>
        <NotificationBell />
      </div>

      {/* STATS CARDS */}
      <div className="stats-grid">
        <div className="stat-card purple">
          <div className="icon">📊</div>
          <p className="label">Total Appointments</p>
          <p className="value">{stats.total}</p>
        </div>

        <div className="stat-card orange">
          <div className="icon">⏳</div>
          <p className="label">Pending</p>
          <p className="value">{stats.pending}</p>
        </div>

        <div className="stat-card blue">
          <div className="icon">✅</div>
          <p className="label">Approved</p>
          <p className="value">{stats.approved}</p>
        </div>

        <div className="stat-card green">
          <div className="icon">🎉</div>
          <p className="label">Completed</p>
          <p className="value">{stats.completed}</p>
        </div>

        <div className="stat-card teal">
          <div className="icon">👥</div>
          <p className="label">Total Patients</p>
          <p className="value">{stats.totalPatients}</p>
        </div>

        <div className="stat-card pink">
          <div className="icon">💰</div>
          <p className="label">Total Earnings</p>
          <p className="value">{formatCurrency(stats.totalEarnings)}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;