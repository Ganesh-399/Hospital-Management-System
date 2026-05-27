import { useState } from "react";
import { loginApi } from "../services/authService";   // ✅ common login
import { useNavigate } from "react-router-dom";

export default function PatientLogin() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",        // ✅ email instead of username
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginApi(data);

      // ✅ save token & role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // ✅ patient redirect
      navigate("/patient");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Patient Login</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={(e) =>
          setData({ ...data, email: e.target.value })
        }
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
        required
      />

      <button>Login</button>
    </form>
  );
}
