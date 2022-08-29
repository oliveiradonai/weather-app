import styles from '../styles/loading.module.scss';

export function Loading() {
    return (
        <div className={styles.loadingOverlay}>
            <h1>Carregando...</h1>
        </div>
    )
}