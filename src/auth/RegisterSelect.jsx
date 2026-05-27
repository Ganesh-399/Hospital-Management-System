import { useNavigate } from "react-router-dom";

export default function RegisterSelect() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>
      
      <div style={styles.content}>
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <span style={styles.logo}>⚕</span>
          </div>
          <h1 style={styles.title}>Join MediCare</h1>
          <p style={styles.subtitle}>Choose your account type to get started</p>
        </div>

        <div style={styles.options}>
          <div
            style={styles.card}
            onClick={() => navigate("/register/patient")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={styles.iconCircle}>
              <span style={styles.icon}>👤</span>
            </div>
            <h3 style={styles.cardTitle}>Patient</h3>
            <p style={styles.cardDescription}>
              Book appointments, manage health records
            </p>
            <div style={styles.arrow}>→</div>
          </div>

          <div
            style={styles.card}
            onClick={() => navigate("/register/doctor")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(118, 75, 162, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{...styles.iconCircle, background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'}}>
              <span style={styles.icon}>👨‍⚕️</span>
            </div>
            <h3 style={styles.cardTitle}>Doctor</h3>
            <p style={styles.cardDescription}>
              Manage patients, appointments & consultations
            </p>
            <div style={styles.arrow}>→</div>
          </div>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Already have an account?{" "}
            <a href="/login" style={styles.link}>
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
  },
  backgroundCircle1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.1)",
    top: "-150px",
    right: "-150px",
  },
  backgroundCircle2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.08)",
    bottom: "-100px",
    left: "-100px",
  },
  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "900px",
    width: "100%",
  },
  header: {
    textAlign: "center",
    marginBottom: "50px",
  },
  logoContainer: {
    width: "80px",
    height: "80px",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 25px",
    backdropFilter: "blur(10px)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
  },
  logo: {
    fontSize: "40px",
  },
  title: {
    fontSize: "42px",
    color: "#fff",
    margin: "0 0 12px 0",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },
  subtitle: {
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.9)",
    margin: 0,
    fontWeight: "300",
  },
  options: {
    display: "flex",
    gap: "40px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    width: "280px",
    minHeight: "320px",
    background: "#fff",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    padding: "40px 30px",
    position: "relative",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
  iconCircle: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "25px",
    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
  },
  icon: {
    fontSize: "48px",
  },
  cardTitle: {
    fontSize: "26px",
    color: "#2d3748",
    margin: "0 0 12px 0",
    fontWeight: "700",
  },
  cardDescription: {
    fontSize: "15px",
    color: "#718096",
    textAlign: "center",
    lineHeight: "1.6",
    margin: "0 0 20px 0",
  },
  arrow: {
    fontSize: "24px",
    color: "#667eea",
    fontWeight: "bold",
    position: "absolute",
    bottom: "25px",
    right: "30px",
    opacity: 0.7,
  },
  footer: {
    textAlign: "center",
    marginTop: "50px",
  },
  footerText: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.95)",
    margin: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
    borderBottom: "2px solid rgba(255, 255, 255, 0.5)",
    paddingBottom: "2px",
    transition: "border-color 0.3s ease",
  },
};