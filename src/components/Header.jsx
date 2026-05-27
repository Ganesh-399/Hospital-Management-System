export default function Header({ role }) {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={styles.header}>
      <div style={styles.brandSection}>
        <div style={styles.logoIcon}>⚕</div>
        <h3 style={styles.brandName}>HealthMS</h3>
      </div>

      <div style={styles.rightSection}>
        <div style={styles.roleBadge}>
          <span style={styles.roleIcon}>●</span>
          <span style={styles.roleText}>{role}</span>
        </div>
        <button 
          onClick={logout} 
          style={styles.logout}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(240, 147, 251, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
          }}
        >
          <span style={styles.logoutIcon}>⎋</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "24px 48px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    alignItems: "center",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: "relative",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
  },
  brandSection: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    animation: "slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  logoIcon: {
    fontSize: "32px",
    background: "rgba(255, 255, 255, 0.2)",
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(10px)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  brandName: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "800",
    letterSpacing: "0.5px",
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    animation: "slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  roleBadge: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 24px",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "30px",
    backdropFilter: "blur(10px)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    fontSize: "14px",
    fontWeight: "700",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
  },
  roleIcon: {
    fontSize: "12px",
    color: "#4ade80",
    filter: "drop-shadow(0 0 6px rgba(74, 222, 128, 0.8))",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  roleText: {
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: "700",
  },
  logout: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 28px",
    cursor: "pointer",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "30px",
    color: "white",
    fontSize: "15px",
    fontWeight: "700",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    position: "relative",
    overflow: "hidden",
  },
  logoutIcon: {
    fontSize: "20px",
    fontWeight: "bold",
    transition: "transform 0.3s ease",
  },
};