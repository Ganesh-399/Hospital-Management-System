import { useLocation, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pageName = location.pathname.split("/")[2] || "dashboard";
  const pageTitle = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  const handleLogout = () => {
    // ✅ CLEAR LOGIN DATA
    localStorage.clear();        // or remove specific keys if you want
    sessionStorage.clear();

    // ✅ REDIRECT TO LOGIN & PREVENT BACK
    navigate("/login", { replace: true });
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <h1 style={styles.title}>{pageTitle}</h1>
        <p style={styles.breadcrumb}>Home › {pageTitle}</p>
      </div>

      <div style={styles.right}>
        <div style={styles.userCard}>
          <div style={styles.avatar}>A</div>
          <div>
            <span style={styles.welcome}>Welcome back</span>
            <strong style={styles.name}>Admin 👋</strong>
          </div>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

/* ================= STYLES ================= */

const styles = {
  header: {
    height: "70px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "0 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "fixed",
    top: 0,
    left: 240,
    right: 0,
    zIndex: 100,
    borderRadius: "0 0 20px 20px",
    color: "#fff",
  },
  left: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 700,
  },
  breadcrumb: {
    margin: 0,
    fontSize: "13px",
    opacity: 0.85,
  },
  userCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(255,255,255,0.2)",
    padding: "8px 16px",
    borderRadius: "30px",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#fff",
    color: "#667eea",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },
  welcome: {
    fontSize: "11px",
    opacity: 0.8,
    display: "block",
  },
  name: {
    fontSize: "14px",
  },
  logoutBtn: {
    marginLeft: "10px",
    background: "#ff6b6b",
    border: "none",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default AdminHeader;
