import styles from "../style/Layout.module.css";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
  title: React.ReactNode;
};

export default function Layout({ children, title }: Props) {
  return (
    <div>
      <Sidebar />
      <div className={styles.container} style={{ marginLeft: "60px" }}>
        <TopBar>{title}</TopBar>
        {children}
      </div>
    </div>
  );
}
