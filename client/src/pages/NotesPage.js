import { useState } from "react";
import { Modal } from "../components/Modal/Modal";
import Note from "../components/Notes/Note";
import { Card } from "../components/Card/Card";

export default function NotesPage() {

    const [modalVisible, isModalVisible] = useState(false);

    return (
        <div className="outlet-output">
            <header className="outlet-output__header">
                <h1>Notes</h1>
            </header>
            <div className="outlet-output__body">
                <div className="outlet-output__body--notes">
                    {[1, 2, 3, 4, 5].map((_) => <Card type='card__note'><Note onClick = {() => isModalVisible(true)}/></Card>)}
                </div>
                {modalVisible && 
                    <Modal onClick = {() => isModalVisible(false)}>
                        <Card type='card__note'>
                            <Note />
                        </Card>
                    </Modal>
                }
            </div>
        </div>
    )
}