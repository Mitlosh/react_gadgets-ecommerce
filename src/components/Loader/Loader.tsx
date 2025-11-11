import styles from './Loader.module.scss';

type Props = {
  message?: string;
};

export const Loader: React.FC<Props> = ({ message = 'Loading…' }) => {
  return (
    <div className={styles.loaderWrapper} aria-busy="true">
      <div className={styles.spinner} />
      <p className={styles.text}>{message}</p>
    </div>
  );
};
