import { useEffect } from "react";
import styles from "../style/Toast.module.css";

type Props = {
  message: string;
  setMessage: (msg: string) => void;
};

function Notification({ message, setMessage }: Props) {
  useEffect(() => {
    if (!message) return;

    const timeout = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timeout);
  }, [message]);

  if (!message) return null;

  return <div className={styles.toast}>{message}</div>;
}



export default Notification;
