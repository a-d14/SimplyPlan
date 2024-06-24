import { NavLink } from "react-router-dom";
import styles from './Sidebar.module.css';

import profile from '../../images/profile-img.png';

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles['sidebar-header']}>
                <h1>SimplyPlan</h1>
                <div className={styles['user-profile']}>
                    <img className={styles['user-profile__image']} src={profile} alt="Profile" />
                    <p className={styles['user-profile__user-name']}>Current User (<NavLink to="">Open Profile</NavLink>)</p>
                </div>
            </div>
            <div className={styles['sidebar-nav']}>
                <NavLink className={styles['sidebar-nav__links']} to=''>Home</NavLink>
                <NavLink className={styles['sidebar-nav__links']} to='tickets'>Tickets</NavLink>
                <NavLink className={styles['sidebar-nav__links']} to='projects'>Projects</NavLink>
                <NavLink className={styles['sidebar-nav__links']} to='notes'>Notes</NavLink>
            </div>
            <div className={styles['sidebar-footer']}>
                <NavLink to="">Logout</NavLink>
            </div>
        </div>
    )
}