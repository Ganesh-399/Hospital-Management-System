import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();   // remove token & role
    navigate("/");          // go to login
  };

  return (
    <div style={styles.topbar}>
      <h2>Admin Dashboard</h2>
      <button onClick={logout} style={styles.logout}>Logout</button>
    </div>
  );
};

export default Topbar;
