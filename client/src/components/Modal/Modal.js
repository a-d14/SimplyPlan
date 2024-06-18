import styles from './Modal.module.css';

function Overlay({onClick}) {
    return <div className={styles.overlay} onClick={onClick}></div>
}

export function Modal({onClick, children}) {
    return (
        <>
            <Overlay onClick={onClick} />
            <div className={styles.content}>
                {children}
            </div>
        </>
    );
}