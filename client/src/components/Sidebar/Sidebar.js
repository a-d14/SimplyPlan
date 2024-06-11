import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <nav>
            <ul>
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
    )
}