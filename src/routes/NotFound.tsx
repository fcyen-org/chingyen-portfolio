import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.root}>
      <div className={styles.eyebrow}>error</div>
      <div className={styles.title}>404</div>
      <p className={styles.blurb}>this route doesn&apos;t exist — the character you&apos;re looking for wandered off the map.</p>
      <Link to="/" className={styles.homeLink}>
        <span aria-hidden="true">←</span> back home
      </Link>
    </main>
  );
}
