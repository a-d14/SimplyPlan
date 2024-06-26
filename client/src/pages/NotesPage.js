import { useState } from "react";
import { Modal } from "../components/Modal/Modal";
import Note from "../components/Notes/Note";
import { Card } from "../components/Card/Card";
import NoteForm from "../components/Notes/NoteForm/NoteForm";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { addNote, editNote } from "../components/utils/noteData";

export default function NotesPage() {

    const notes = useLoaderData();
    const navigate = useNavigate();

    const [modalVisible, isModalVisible] = useState(false);
    const [formVisible, isFormVisible] = useState(false);

    const [selectedNote, setSelectedNote] = useState(null);

    const closeForm = function() {
        setSelectedNote(null); 
        isFormVisible(false); 
        navigate(".", {relative: "path"});
    }

    return (
        <div className="outlet-output">
            <header className="header">
                <h1>Notes</h1>
                <NavLink to="add" onClick={() => isFormVisible(true)} className="btn__add-note">Add Note</NavLink>
            </header>
            <div className="outlet-output__body">
                <div className="outlet-output__body--notes">
                    {notes.map((note) => 
                        <Card type='card__note'>
                            <Note 
                                key={note._id} 
                                data={note} 
                                onEdit={() => {setSelectedNote(note); isFormVisible(true);}} 
                                onClick = {() => {setSelectedNote(note); isModalVisible(true);console.log("Note click")}}
                            />
                        </Card>
                    )}
                </div>
            </div>
            {modalVisible && 
                    <Modal onClick = {() => {setSelectedNote(null); isModalVisible(false); navigate(".", {relative: "path"});}}>
                        <Card>
                            <Note data={selectedNote} />
                        </Card>
                    </Modal>
            }
            {formVisible && 
                    <Modal onClick = {closeForm}>
                        <Card>
                            {!selectedNote && <NoteForm onClose={closeForm} onSubmit={addNote} data={selectedNote} />}
                            {selectedNote && <NoteForm onEdit={() =>  {console.log("Form");isFormVisible(true)}} onClose={closeForm} onSubmit={editNote} data={selectedNote} />}
                        </Card>
                    </Modal>
            }
        </div>
    )
}
