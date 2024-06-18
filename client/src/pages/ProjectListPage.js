import { Card } from "../components/Card/Card";
import ProjectList from "../components/ProjectList/ProjectList";

export default function ProjectListPage() {
    return (
        <div className="outlet-output">
            <h1 className="outlet-header">Projects</h1>
            <Card type='card__project-list'>
                <ProjectList />
            </Card>
        </div>
    )
}