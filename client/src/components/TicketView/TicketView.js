import styles from './TicketView.module.css';

export default function TicketView({ ticket, inList }) {
    return (
        <div className={styles["ticket"]}>
            <div>
                <h4>{ticket.title}</h4>
                <div className={styles["ticket__info"]}>
                    {inList && <p className="small-text"><strong>Project:</strong> {ticket.project.name}</p>}
                    <p className="small-text"><strong>Deadline :</strong> {ticket.deadline}</p>
                    <p className="small-text"><strong>Priority :</strong> {ticket.deadline}</p>
                    <p className="small-text"><strong>Status : </strong>{ticket.status ? ticket.status : "Unassigned"}</p>
                    <p className="small-text"><strong>Assigned to:</strong> {ticket.assignedDev.name}</p>
                </div>
            </div>
            <hr />
            <div>
                <p>{ticket.description}</p>
            </div>
        </div>
    )
}