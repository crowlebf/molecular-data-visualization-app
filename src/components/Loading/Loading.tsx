import styles from './Loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loadingContainer}>
        <div className={`${styles.loadingBubble} ${styles.loadingBubble1}`} />
        <div className={`${styles.loadingBubble} ${styles.loadingBubble2}`} />
        <div className={`${styles.loadingBubble} ${styles.loadingBubble3}`} />
      </div>
    </div>
  );
}
