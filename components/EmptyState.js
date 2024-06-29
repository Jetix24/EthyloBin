import styles from "./EmptyState.module.css";

const EmptyState = ({ tipo }) => {
  return (
    <div className={styles.state}>
      <div className={styles.container}>
        <h3 className={styles.title}>Selecciona {tipo}</h3>
      </div>
    </div>
  );
};

export default EmptyState;
