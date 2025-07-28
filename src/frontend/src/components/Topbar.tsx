import styles from "./Topbar.module.css"; // optional CSS module

type Props = {
  title: string;
  button?: React.ReactNode; // make optional
};

export default function Topbar({ title, button }: Props) {
  return (
    <div className={styles.topbar} style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
      <h3 className={styles.title}>{title}</h3>
      {button && <div className={styles.buttonWrapper}>{button}</div>}
    </div>
  );
}
