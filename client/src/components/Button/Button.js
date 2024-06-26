import styles from './Button.module.css';

export default function Button({type, text}) {

    return <button type={type} className={styles[`btn__${type.toLowerCase()}`]}>{text}</button>
}
