import styles from "./Button.module.css";

export default function Button({ onClick, children }: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}
