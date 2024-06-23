import { Card } from "../components/Card/Card";
import ProjectList from "../components/ProjectList/ProjectList";

export default function ProjectListPage() {
    return (
        <div className="outlet-output">
            <header className="outlet-output__header">
                <h1>Projects</h1>
            </header>
            <div className="outlet-output__body">
                <Card type='card__project-list'>
                    <ProjectList />
                </Card>
            </div>
        </div>
    )
}