import React from "react";
import styles from "./infocard.module.css"

type InfoCardProps = {
  icon: React.ReactNode;
  title: string;
  value: number | string;
};

export default function InfoCard({ icon, title, value }: InfoCardProps) {
  return (
    <div className={styles.infocard}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
      </div>
    </div>
  );
}
