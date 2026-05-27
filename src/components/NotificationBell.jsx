import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./NotificationBell.css";

const NotificationBell = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const loadNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error("Notification load failed", err);
    }
  };

  useEffect(() => {
    loadNotifications();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleOpen = () => {
    if (!open) loadNotifications();
    setOpen(!open);
  };

  const markReadAndNavigate = async (notification) => {
    // Mark as read
    await api.put(`/notifications/${notification.id}/read`);
    loadNotifications();
    setOpen(false);

    // Navigate based on user role
    const role = localStorage.getItem("role");
    if (role === "PATIENT") {
      navigate("/");
    } else if (role === "DOCTOR") {
      navigate("/doctor/appointments");
    } else if (role === "ADMIN") {
      navigate("/admin/appointments");
    }
  };

  // Delete notification
  const deleteNotification = async (e, notificationId) => {
    e.stopPropagation(); // Prevent parent click
    try {
      await api.delete(`/notifications/${notificationId}`);
      loadNotifications();
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  };

  // Use lowercase 'read' - matches JSON from backend
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notif-container">
      {/* Bell Icon */}
      <button className="bell-button" onClick={toggleOpen}>
        <svg className="bell-icon" width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {unreadCount > 0 && (
          <span className="badge-enhanced">{unreadCount}</span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div className="notif-overlay" onClick={toggleOpen}></div>
          <div className="notif-dropdown-enhanced">
            <div className="notif-header">
              <h3>Notifications</h3>
              {unreadCount > 0 && (
                <span className="unread-badge">{unreadCount} new</span>
              )}
            </div>

            <div className="notif-list">
              {notifications.length === 0 ? (
                <div className="notif-empty">
                  <div className="empty-icon">🔔</div>
                  <p>No notifications yet</p>
                  <span>We'll notify you when something arrives</span>
                </div>
              ) : (
                notifications.map(n => (
                  <div
                    key={n.id}
                    className={`notif-item-enhanced ${!n.read ? 'unread' : ''}`}
                    onClick={() => markReadAndNavigate(n)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="notif-icon">
                      {!n.read ? '🔵' : '✓'}
                    </div>
                    <div className="notif-content">
                      <p className="notif-message">{n.message}</p>
                      <span className="notif-time">
                        {new Date(n.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      className="notif-delete-btn"
                      onClick={(e) => deleteNotification(e, n.id)}
                      title="Delete notification"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="notif-footer">
                <button
                  className="view-all-btn"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;