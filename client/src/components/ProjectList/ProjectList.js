import styles from './Project.module.css';
import { projects } from '../utils/projectData';

import { NavLink } from "react-router-dom";

export default function ProjectList() {
    
    return (
        <table className={styles['project-table']}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Deadline</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {projects.map(project => (
                    <tr key={project.id}>
                        <td><NavLink to={`/projects/${project.id}`}>{project.name}</NavLink></td>
                        <td>{project.description}</td>
                        <td>{project.priority}</td>
                        <td>{project.deadline}</td>
                        <td>{project.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}