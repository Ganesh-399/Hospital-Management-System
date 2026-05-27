import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./adminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
