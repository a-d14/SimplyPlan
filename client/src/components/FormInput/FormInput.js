import { forwardRef } from 'react';
import styles from './FormInput.module.css';

export const FormInput = forwardRef(function({label, type, datatype, value}, ref) {
    return (
        <div className={styles['form-controls']}>
            <label>{label}</label>
            {type === 'textarea' ? <textarea defaultValue={value ? value: ''} ref={ref}/> : <input type={datatype} defaultValue={value ? value : ''} ref={ref}/>}
        </div>
    );
});