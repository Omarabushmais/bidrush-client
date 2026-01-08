import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.subtitle}>
          The page you’re looking for doesn’t exist or may have been moved.
        </p>
        <Link to="/" className={styles.homeBtn}>
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
