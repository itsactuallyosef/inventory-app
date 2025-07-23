import styles from "../style/Button.module.css"

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};


export default function Button({ children, onClick }: Props) {
  return <button className={styles.actionButton} onClick={onClick}>{children}</button>;
}