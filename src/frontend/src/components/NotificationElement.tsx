import styles from "../style/Notifications.module.css"
import type { Notification } from "../types/NotificationType"

type Props = {
    notification: Notification,
    onClick: Function
}

function NotificationElement({ notification, onClick }: Props) {
  return (
    <div
      className={styles.notification}
      onClick={() => onClick(notification._id)}
    >
      <p className={styles.message}>{notification.message}</p>
      <p className={styles.date}>{new Date(notification.date).toLocaleString()}</p>
    </div>
  );
}

export default NotificationElement