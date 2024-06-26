import { useRef } from 'react';
import Button from '../../Button/Button';
import { FormInput } from '../../FormInput/FormInput';
import styles from './NoteForm.module.css';

export default function NoteForm({onClose, onSubmit, data}) {

    const titleRef= useRef(null);
    const contentRef = useRef(null);

    const submitForm = function(e) {

        e.preventDefault();

        const title = titleRef.current.value;
        const content = contentRef.current.value;

        const newNote = data ? {...data, title, content} : {title, content};

        onSubmit(newNote);
        
        onClose();
    }

    return (
        <div className={styles['add-note']}>
            <h2>{data ? 'Edit' : 'Add'} Note</h2>
            <form onSubmit={submitForm}>
                <FormInput label="Title" type="input" datatype="text" ref={titleRef} value={data ? data.title : null}/>
                <FormInput label="Content" type="textarea" ref={contentRef} value={data ? data.content : null}/>
                <Button type="submit" text={data ? "Update" : "Add Note"}/>
            </form>
        </div>
    )
}