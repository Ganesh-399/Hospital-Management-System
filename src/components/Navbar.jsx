// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <span>Admin Panel</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;
