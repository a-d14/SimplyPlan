import styles from './Project.module.css';

import { NavLink } from "react-router-dom";

export default function ProjectList() {

    const projects = [
        {
            name: "Project Alpha",
            description: "Development of a new e-commerce platform.",
            priority: "High",
            deadline: "2024-07-15",
            status: "In Progress"
        },
        {
            name: "Project Beta",
            description: "Redesign of the company website.",
            priority: "Medium",
            deadline: "2024-08-01",
            status: "Not Started"
        },
        {
            name: "Project Gamma",
            description: "Implementation of a customer feedback system.",
            priority: "Low",
            deadline: "2024-09-10",
            status: "In Progress"
        },
        {
            name: "Project Delta",
            description: "Upgrade of the internal network infrastructure.",
            priority: "High",
            deadline: "2024-06-30",
            status: "Completed"
        },
        {
            name: "Project Epsilon",
            description: "Development of a mobile application.",
            priority: "Medium",
            deadline: "2024-10-05",
            status: "In Progress"
        },
        {
            name: "Project Zeta",
            description: "Launch of a new marketing campaign.",
            priority: "Low",
            deadline: "2024-07-20",
            status: "Not Started"
        },
        {
            name: "Project Eta",
            description: "Integration with third-party payment gateways.",
            priority: "High",
            deadline: "2024-08-15",
            status: "In Progress"
        },
        {
            name: "Project Theta",
            description: "Data migration to the new server.",
            priority: "Medium",
            deadline: "2024-07-01",
            status: "Completed"
        },
        {
            name: "Project Iota",
            description: "Implementation of security protocols.",
            priority: "High",
            deadline: "2024-09-30",
            status: "In Progress"
        },
        {
            name: "Project Kappa",
            description: "Employee training and development program.",
            priority: "Low",
            deadline: "2024-11-01",
            status: "Not Started"
        }
    ];
    
    return (
        <table className={styles['project-table']}>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Status</th>
            </tr>
            {projects.map(project => (
                <tr>
                    <td><NavLink>{project.name}</NavLink></td>
                    <td>{project.description}</td>
                    <td>{project.priority}</td>
                    <td>{project.deadline}</td>
                    <td>{project.status}</td>
                </tr>
            ))}
        </table>
    );
}