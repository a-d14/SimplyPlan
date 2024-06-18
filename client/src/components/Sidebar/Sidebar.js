import { NavLink } from "react-router-dom";
import styles from './Sidebar.module.css';

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles['sidebar-header']}>
                <h1>SimplyPlan</h1>
            </div>
            <div className={styles['sidebar-nav']}>
                <nav>
                    <ul className={styles['nav-links']}>
                        <li>
                            <NavLink to=''>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='dashboard'>Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to='projects'>Projects</NavLink>
                        </li>
                        <li>
                            <NavLink to='notes'>Notes</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={styles['sidebar-footer']}>
                <button>Logout</button>
            </div>
        </div>
    )
}