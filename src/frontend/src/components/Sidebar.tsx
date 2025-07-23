import { Link } from "react-router-dom";
import styles from "../style/Sidebar.module.css";
import { FaBox, FaChartBar, FaBell } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link to="/" className={styles["sidebar-icon"]}>
        <FaBox />
      </Link>
      <Link to="/invoices" className={styles["sidebar-icon"]}>
        <FaChartBar />
      </Link>
      <Link to="/notifications" className={styles["sidebar-icon"]}>
        <FaBell />
      </Link>
    </div>
  );
}
