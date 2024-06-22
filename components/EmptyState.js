import styles from "./EmptyState.module.css";

const EmptyState = () => {
  return (
    <div className={styles.state}>
      <div className={styles.container}>
        <h3 className={styles.title}>Selecciona un elemento</h3>
      </div>
    </div>
  );
};

export default EmptyState;
