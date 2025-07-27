import styles from "./Topbar.module.css"; // optional CSS module

export default function Topbar({ title }: { title: string }) {
  return (
    <div className={styles.topbar}>
      <h3 className="topbar-title">{title}</h3>
    </div>
  );
}
