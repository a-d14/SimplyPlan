import { NavLink } from 'react-router-dom';
import styles from './Note.module.css';

export default function Note({data, onEdit, onClick}) {
    return (
        <div className={styles.note} onClick={onClick}>
            <h3 className={styles.note__header}>{data.title}</h3>
            <p className={styles.note__body}>{data.content}</p>
            <div className={styles.note__footer}>
                <p className={styles["note__footer--date"]}>{data.creationDate}</p>
                <NavLink onClick={(e) => {e.stopPropagation(); onEdit()}} className={styles["note__footer--edit"]} to="edit">Edit</NavLink>
            </div>
        </div>
    )
}