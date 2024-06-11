import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

export default function HomePage() {
    return (
        <div>
            <Sidebar /> 
            <Outlet />
        </div>
    )
}