import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPatient = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    disease: "",
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
        role: "PATIENT",
        name: form.name,
        age: Number(form.age),
        disease: form.disease,
      });

      alert("Patient registered successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "Registration failed");
    }
  };

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      maxWidth: "1400px",
      margin: "0 auto",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    left: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "60px",
      color: "white",
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
      color: "#333",
      fontSize: "2rem",
      marginBottom: "35px",
      textAlign: "center",
      fontWeight: 600,
    },
    input: {
      width: "100%",
      padding: "15px 18px",
      marginBottom: "20px",
      border: "2px solid #e0e0e0",
      borderRadius: "10px",
      fontSize: "1rem",
      outline: "none",
      fontFamily: "inherit",
      transition: "all 0.3s ease",
    },
    button: {
      width: "100%",
      padding: "16px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "1.1rem",
      fontWeight: 600,
      cursor: "pointer",
      marginTop: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      transition: "all 0.3s ease",
    },
    footer: {
      textAlign: "center",
      marginTop: "25px",
      color: "#666",
      fontSize: "0.95rem",
    },
    link: {
      color: "#667eea",
      fontWeight: 600,
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
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }
        @media (max-width: 968px) {
          .container {
            flex-direction: column !important;
          }
          .left {
            padding: 40px 30px !important;
            text-align: center !important;
          }
          .left h1 {
            font-size: 2.5rem !important;
          }
          .left p {
            font-size: 1.2rem !important;
          }
          .right {
            padding: 20px 30px 60px !important;
          }
          .card {
            padding: 40px 30px !important;
          }
        }
        @media (max-width: 480px) {
          .left h1 {
            font-size: 2rem !important;
          }
          .left p {
            font-size: 1rem !important;
          }
          .card {
            padding: 30px 25px !important;
          }
          .card h2 {
            font-size: 1.6rem !important;
          }
        }
      `}</style>

      <div className="container" style={styles.container}>
        <div className="left" style={styles.left}>
          <h1 style={styles.leftH1}>Hospital Management System</h1>
          <p style={styles.leftP}>Your health, our priority</p>
        </div>

        <div className="right" style={styles.right}>
          <form className="card" style={styles.card} onSubmit={submit}>
            <h2 style={styles.cardH2}>Patient Registration</h2>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e0e0e0";
                e.target.style.boxShadow = "none";
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
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e0e0e0";
                e.target.style.boxShadow = "none";
              }}
            />

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e0e0e0";
                e.target.style.boxShadow = "none";
              }}
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e0e0e0";
                e.target.style.boxShadow = "none";
              }}
            />

            <input
              name="disease"
              placeholder="Disease"
              value={form.disease}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e0e0e0";
                e.target.style.boxShadow = "none";
              }}
            />

            <button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 10px 25px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Register
            </button>

            <div className="footer" style={styles.footer}>
              Already have an account?{" "}
              <span
                className="link"
                style={styles.link}
                onClick={() => navigate("/login")}
                onMouseEnter={(e) => {
                  e.target.style.color = "#764ba2";
                  e.target.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#667eea";
                  e.target.style.textDecoration = "none";
                }}
              >
                Sign in
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPatient;