import { useEffect, useState } from "react";
import { getNotifications } from "../api/notificationsAPI";
import type { Notification } from "../types/NotificationType"
import styles from "../style/Notifications.module.css";
import NotificationElement from "../components/NotificationElement";
import { deleteNotification } from "../api/notificationsAPI"; // <- you need this
import NotificationToast from "../components/Toast";


function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");


  useEffect(() => {
    getNotifications()
      .then(setNotifications)
      .catch((err) => setError(err.message || "Failed to load notifications"));
  }, []);

  const removeNotification = async (id: string) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      setToastMessage("🗑️ Notification deleted");
    } catch (err: any) {
      console.error("Failed to delete notification", err);
      setToastMessage("❌ Failed to delete notification");
    }
  };


  return (
    
    <div className={styles.container}>
      <NotificationToast message={toastMessage} setMessage={setToastMessage} />

      {error && <p className={styles.error}>{error}</p>}

      {notifications.length === 0 && !error && (
        <p className={styles.empty}>No notifications yet.</p>
      )}

      <div className={styles.notifications}>
        {notifications.map((n) => (
            <NotificationElement notification={n} onClick={removeNotification}/>
        ))}
      </div>
    </div>
  );

}

export default Notifications;
