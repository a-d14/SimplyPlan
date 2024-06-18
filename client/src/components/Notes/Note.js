import styles from './Note.module.css';

export default function Note({onClick}) {
    return (
        <div className={styles.note} onClick={onClick}>
            <h3 className={styles.note__header}>This is a note title</h3>
            <p className={styles.note__body}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non lectus et sem eleifend iaculis sed quis nulla.</p>
            <p className={styles.note__footer}>Jun 16, 2024</p>
        </div>
    )
}