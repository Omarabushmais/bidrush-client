import styles from "./StatCard.module.css";

function StatCard({ icon, title, value }) {
  return (
    <div className={styles.card}>
      <img src={icon} alt="" className={styles.icon} />
      <div className={styles.cent}>
        <p className={styles.title}>{title}</p>
        <p className={styles.value}>{value}</p>
      </div>
    </div>
  );
}

export default StatCard;
