import { useLoaderData } from "react-router-dom";

import styles from './ProjectView.module.css';

import pie from "../../images/piechart.png";
import TicketView from "../TicketView/TicketView";

export default function ProjectView() {

    const project = useLoaderData();

   return (
    <div className="outlet-output">
        <header className="header">
            <h1>{project.name}</h1>
        </header>
        <div className="outlet-output__body">
            <div className="header">
                <h2>Summary</h2>
            </div>
            <div className={styles["project__summary"]}>
                <div className={styles["project__details--graph"]}>
                    <h2>Progress</h2>
                    <img className={styles["graph__img"]} src={pie} alt="Pie" />
                    <p><strong>Completion:</strong> 50%</p>
                </div>
                <div className={styles["project__summary--info"]}>
                    <p className={styles["project__description"]}><strong>Description:</strong> <br />{project.longDescription}<br /><br /> <strong>Manager:</strong> {project.manager.name}</p>
                    <div className={styles["project__summary--critical"]}>
                        <p><strong>Priority:</strong> <br /> {project.priority}</p>
                        <p><strong>Status: </strong><br />{project.status}</p>
                        <p><strong>Deadline: </strong> <br /> {project.deadline}</p>
                    </div>
                </div>
            </div>
            <div className="header">
                <h2>Details</h2>
            </div>
            <div className={styles["project__details"]}>
                {/* <div className={styles["project__summary--manager"]}>
                    <img className={styles["profile__img"]} src={profile} alt="Manager"/>
                    <h3>{project.manager.name}</h3>
                </div> */}
                <div className={styles["project__details--developers"]}>
                    <h2>Developers</h2>
                    {
                        project.assignedDevs.map((dev) => {
                            return (
                                <div>
                                    <p>{dev.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles["project__details--tickets"]}>
                    <h2>Tickets</h2>
                    {
                        project.assignedTickets.map((ticket) => {
                            return (
                                <TicketView ticket={ticket} inList={false} />
                            );
                        })
                    }
                    {/* {project.assignedTickets} */}
                </div>
                {/* <div className={styles["project__details--developers"]}>
                    <h2>Developers</h2>
                </div> */}
            </div>
        </div>
    </div>
    );
}