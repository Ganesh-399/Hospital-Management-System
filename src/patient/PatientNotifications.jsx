import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useToast } from "../components/Toast";
import "./PatientNotifications.css";

const PatientNotifications = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        try {
            const res = await api.get("/notifications");
            setNotifications(res.data);
        } catch (err) {
            console.error("Failed to load notifications", err);
            toast.error("Failed to load notifications");
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notification) => {
        try {
            await api.put(`/notifications/${notification.id}/read`);
            loadNotifications();
        } catch (err) {
            console.error("Failed to mark as read", err);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            await api.delete(`/notifications/${notificationId}`);
            toast.success("Notification deleted");
            loadNotifications();
        } catch (err) {
            console.error("Failed to delete notification", err);
            toast.error("Failed to delete notification");
        }
    };

    const markAllAsRead = async () => {
        try {
            for (const n of notifications.filter((n) => !n.read)) {
                await api.put(`/notifications/${n.id}/read`);
            }
            toast.success("All notifications marked as read");
            loadNotifications();
        } catch (err) {
            console.error("Failed to mark all as read", err);
        }
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            if (hours === 0) {
                const minutes = Math.floor(diff / (1000 * 60));
                return minutes <= 1 ? "Just now" : `${minutes} minutes ago`;
            }
            return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
        } else if (days === 1) {
            return "Yesterday";
        } else if (days < 7) {
            return `${days} days ago`;
        } else {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
            });
        }
    };

    return (
        <div className="notifications-page">
            <div className="notifications-header">
                <div className="header-left">
                    <button className="back-btn" onClick={() => navigate("/patient")}>
                        ← Back
                    </button>
                    <h1>🔔 Notifications</h1>
                    {unreadCount > 0 && (
                        <span className="unread-count">{unreadCount} new</span>
                    )}
                </div>
                {unreadCount > 0 && (
                    <button className="mark-all-btn" onClick={markAllAsRead}>
                        ✓ Mark all as read
                    </button>
                )}
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading notifications...</p>
                </div>
            ) : notifications.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🔔</div>
                    <h2>No notifications yet</h2>
                    <p>We'll notify you when something important happens</p>
                    <button
                        className="back-dashboard-btn"
                        onClick={() => navigate("/patient")}
                    >
                        Go to Dashboard
                    </button>
                </div>
            ) : (
                <div className="notifications-list">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`notification-card ${!notification.read ? "unread" : ""}`}
                            onClick={() => markAsRead(notification)}
                        >
                            <div className="notification-icon">
                                {!notification.read ? "🔵" : "✓"}
                            </div>

                            <div className="notification-content">
                                <p className="notification-message">{notification.message}</p>
                                <span className="notification-time">
                                    {formatDate(notification.createdAt)}
                                </span>
                            </div>

                            <button
                                className="delete-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                }}
                                title="Delete notification"
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PatientNotifications;
