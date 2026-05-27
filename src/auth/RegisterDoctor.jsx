import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterDoctor = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    specialization: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        email: form.email,
        password: form.password,
        role: "DOCTOR",
        name: form.name,
        specialization: form.specialization,
      });

      alert("Doctor registered successfully");
      navigate("/login");
    } catch (error) {
      console.error("Doctor Register Error:", error.response);
      alert(error.response?.data || "Doctor registration failed");
    }
  };

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      maxWidth: "1400px",
      margin: "0 auto",
      background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #7c3aed 100%)",
    },
    left: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "60px",
      color: "white",
      position: "relative",
    },
    iconContainer: {
      fontSize: "5rem",
      marginBottom: "30px",
      animation: "pulse 2s infinite",
    },
    leftH1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      marginBottom: "20px",
      lineHeight: 1.2,
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    },
    leftP: {
      fontSize: "1.5rem",
      opacity: 0.95,
      fontWeight: 300,
      marginTop: "10px",
    },
    badge: {
      display: "inline-block",
      background: "rgba(255, 255, 255, 0.2)",
      padding: "8px 20px",
      borderRadius: "50px",
      fontSize: "0.9rem",
      fontWeight: 600,
      marginTop: "20px",
      backdropFilter: "blur(10px)",
    },
    right: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
    },
    card: {
      background: "white",
      padding: "50px 45px",
      borderRadius: "20px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
      width: "100%",
      maxWidth: "450px",
    },
    cardH2: {
      color: "#1e293b",
      fontSize: "2rem",
      marginBottom: "10px",
      textAlign: "center",
      fontWeight: 700,
    },
    subtitle: {
      color: "#64748b",
      fontSize: "0.95rem",
      textAlign: "center",
      marginBottom: "35px",
    },
    input: {
      width: "100%",
      padding: "15px 18px",
      marginBottom: "20px",
      border: "2px solid #e2e8f0",
      borderRadius: "10px",
      fontSize: "1rem",
      outline: "none",
      fontFamily: "inherit",
      transition: "all 0.3s ease",
      backgroundColor: "#f8fafc",
    },
    button: {
      width: "100%",
      padding: "16px",
      background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #7c3aed 100%)",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "1.1rem",
      fontWeight: 700,
      cursor: "pointer",
      marginTop: "10px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      transition: "all 0.3s ease",
    },
    footer: {
      textAlign: "center",
      marginTop: "30px",
      color: "#64748b",
      fontSize: "0.95rem",
    },
    link: {
      color: "#2563eb",
      fontWeight: 700,
      cursor: "pointer",
      transition: "color 0.3s ease",
    },
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #7c3aed 100%);
          min-height: 100vh;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .doc-container {
          animation: fadeIn 0.6s ease-out;
        }
        @media (max-width: 968px) {
          .doc-container {
            flex-direction: column !important;
          }
          .doc-left {
            padding: 40px 30px !important;
            text-align: center !important;
          }
          .doc-left h1 {
            font-size: 2.5rem !important;
          }
          .doc-left p {
            font-size: 1.2rem !important;
          }
          .doc-right {
            padding: 20px 30px 60px !important;
          }
          .doc-card {
            padding: 40px 30px !important;
          }
        }
        @media (max-width: 480px) {
          .doc-left h1 {
            font-size: 2rem !important;
          }
          .doc-left p {
            font-size: 1rem !important;
          }
          .doc-card {
            padding: 30px 25px !important;
          }
          .doc-card h2 {
            font-size: 1.6rem !important;
          }
        }
      `}</style>

      <div className="doc-container" style={styles.container}>
        <div className="doc-left" style={styles.left}>
          <div style={styles.iconContainer}>👨‍⚕️</div>
          <h1 style={styles.leftH1}>Medical Professional Registration</h1>
          <p style={styles.leftP}>Join our network of healthcare excellence</p>
          <span style={styles.badge}>🏥 Trusted Healthcare Platform</span>
        </div>

        <div className="doc-right" style={styles.right}>
          <form className="doc-card" style={styles.card} onSubmit={submit}>
            <h2 style={styles.cardH2}>Doctor Registration</h2>
            <p style={styles.subtitle}>Create your professional account</p>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563eb";
                e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
                e.target.style.backgroundColor = "#ffffff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
                e.target.style.backgroundColor = "#f8fafc";
              }}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563eb";
                e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
                e.target.style.backgroundColor = "#ffffff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
                e.target.style.backgroundColor = "#f8fafc";
              }}
            />

            <input
              name="name"
              placeholder="Full Name (Dr. John Doe)"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563eb";
                e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
                e.target.style.backgroundColor = "#ffffff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
                e.target.style.backgroundColor = "#f8fafc";
              }}
            />

            <input
              name="specialization"
              placeholder="Specialization (e.g., Cardiology)"
              value={form.specialization}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563eb";
                e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
                e.target.style.backgroundColor = "#ffffff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
                e.target.style.backgroundColor = "#f8fafc";
              }}
            />

            <button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 10px 30px rgba(37, 99, 235, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Register Doctor
            </button>

            <p style={styles.footer}>
              Already have an account?{" "}
              <span
                style={styles.link}
                onClick={() => navigate("/login")}
                onMouseEnter={(e) => {
                  e.target.style.color = "#7c3aed";
                  e.target.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#2563eb";
                  e.target.style.textDecoration = "none";
                }}
              >
                Sign in
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterDoctor;