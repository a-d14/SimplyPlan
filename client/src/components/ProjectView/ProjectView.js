import { useLoaderData } from "react-router-dom";

import styles from './ProjectView.module.css';

import profile from "../../images/profile-img.png";

import pie from "../../images/piechart.png";

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
                <div className={styles["project__summary--manager"]}>
                    <img className={styles["profile__img"]} src={profile} alt="Manager"/>
                    <h3>{project.manager.name}</h3>
                </div>
                <div className={styles["project__summary--info"]}>
                    <p><strong>Description:</strong> <br />{project.longDescription}</p>
                    <div className={styles["project__summary--critical"]}>
                        <p>Priority: <br /> {project.priority}</p>
                        <p>Status:<br />{project.status}</p>
                        <p>Deadine: <br /> {project.deadline}</p>
                    </div>
                </div>
            </div>
            <div className="header">
                <h2>Details</h2>
            </div>
            <div className={styles["project__details"]}>
                <div className={styles["project__details--graph"]}>
                    <h2>Completion</h2>
                    <img className={styles["graph__img"]} src={pie} alt="Pie" />
                </div>
                <div className={styles["project__details--tickets"]}>
                    <h2>Tickets</h2>
                    {
                        project.assignedTickets.map((ticket) => {
                            return <div>
                                <p>{ticket.title}</p>
                            </div>
                        })
                    }
                    {
                        project.assignedTickets.map((ticket) => {
                            return <div>
                                <p>{ticket.title}</p>
                            </div>
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