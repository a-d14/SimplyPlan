import styles from './Card.module.css';

export function Card({type, children}) {
    return <div className={`${styles.card} ${styles[type]}`}>
        {children}
    </div>
}