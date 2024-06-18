import { useState } from "react";
import { Modal } from "../components/Modal/Modal";
import Note from "../components/Notes/Note";

export default function NotesPage() {

    const [modalVisible, isModalVisible] = useState(false);

    return (
        <div className="outlet-output">
            <h1 className="outlet-header">Notes</h1>
            <div className="outlet-output__notes">
                {[1, 2, 3, 4, 5].map((el) => <Note onClick = {() => isModalVisible(true)} />)}
            </div>
            {modalVisible && <Modal onClick = {() => isModalVisible(false)}><Note /></Modal>}
        </div>
    )
}