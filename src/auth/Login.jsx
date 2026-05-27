import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  /* ✅ AUTO REDIRECT IF ALREADY LOGGED IN */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "DOCTOR") navigate("/doctor");
      else if (role === "PATIENT") navigate("/patient");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginApi(data);

      // ✅ Save token + role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // ✅ ROLE-BASED REDIRECT (FIXED)
      if (res.data.role === "ADMIN") navigate("/admin/dashboard");
      else if (res.data.role === "DOCTOR") navigate("/doctor");
      else navigate("/patient");

    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT PANEL */}
      <div style={styles.leftPanel}>
        <div style={styles.brandSection}>
          <div style={styles.logoCircle}>
            <span style={styles.logoIcon}>⚕</span>
          </div>
          <h1 style={styles.brandTitle}>MediCare</h1>
          <p style={styles.brandSubtitle}>Hospital Management System</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={styles.rightPanel}>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Welcome To Login Page</h2>
            <p style={styles.formSubtitle}>
              Please login to your account
            </p>
          </div>

          {error && (
            <div style={styles.errorBox}>
              <span style={styles.errorIcon}>⚠</span>
              <span>{error}</span>
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={data.email}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={data.password}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            <span>Login</span>
            <span style={styles.buttonArrow}>→</span>
          </button>

          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <span style={styles.dividerText}>or</span>
            <span style={styles.dividerLine}></span>
          </div>

          <p style={styles.registerText}>
            New user?{" "}
            <span
              style={styles.registerLink}
              onClick={() => navigate("/register")}
            >
              Create an account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

/* ===== STYLES (UNCHANGED) ===== */
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflow: "hidden",
  },
  leftPanel: {
    flex: 1,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    position: "relative",
    overflow: "hidden",
  },
  brandSection: {
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  logoCircle: {
    width: "120px",
    height: "120px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 30px",
    border: "3px solid rgba(255,255,255,0.3)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  logoIcon: {
    fontSize: "60px",
    color: "#fff",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
  },
  brandTitle: {
    fontSize: "48px",
    color: "#fff",
    margin: "0 0 10px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
    textShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  brandSubtitle: {
    fontSize: "18px",
    color: "rgba(255,255,255,0.95)",
    fontWeight: "300",
    letterSpacing: "0.3px",
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8f9fa",
    padding: "40px",
  },
  form: {
    width: "100%",
    maxWidth: "420px",
    padding: "50px 40px",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  formHeader: {
    marginBottom: "35px",
    textAlign: "center",
  },
  formTitle: {
    fontSize: "32px",
    color: "#2d3748",
    marginBottom: "8px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },
  formSubtitle: {
    fontSize: "15px",
    color: "#718096",
    fontWeight: "400",
  },
  errorBox: {
    background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
    border: "1px solid #fca5a5",
    borderRadius: "10px",
    padding: "14px 18px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#991b1b",
    fontSize: "14px",
    boxShadow: "0 2px 8px rgba(239, 68, 68, 0.1)",
  },
  inputGroup: {
    marginBottom: "24px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    display: "block",
    color: "#2d3748",
    letterSpacing: "0.2px",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "15px",
    color: "#2d3748",
    transition: "all 0.2s ease",
    backgroundColor: "#fff",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    letterSpacing: "0.3px",
  },
  buttonArrow: {
    fontSize: "20px",
    transition: "transform 0.3s ease",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "30px 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "linear-gradient(90deg, transparent, #e2e8f0, transparent)",
  },
  dividerText: {
    padding: "0 15px",
    color: "#a0aec0",
    fontSize: "13px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  registerText: {
    textAlign: "center",
    fontSize: "14px",
    color: "#718096",
    marginTop: "10px",
  },
  registerLink: {
    color: "#667eea",
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
};
export default Login;
