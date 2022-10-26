import styles from '../styles/footer.module.scss';

export function Footer(props: any){
    return (
        <>
            <div className={styles.footer}>
                <p>&copy; 2022 Todos os direitos reservados - Desenvolvido por Adonai Figueiredo</p>
            </div>
        </>
    )
}