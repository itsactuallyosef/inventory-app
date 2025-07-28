import styles from "../components/Topbar.module.css";

type ModalLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function ModalLayout({ title, children }: ModalLayoutProps) {
  return (
    <div>
      <div className={`${styles.topbar} ${styles.topbarCentered}`}>
        <h3 className={styles.title}>{title}</h3>
    </div>
    <div className={styles.container}>
        {children}
    </div>
    </div>
  );
}
