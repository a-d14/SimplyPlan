import ProjectList from "../components/ProjectList/ProjectList";

export default function ProjectListPage() {
    return (
        <div className="outlet-output">
            <h1 className="outlet-header">Projects</h1>
            <div>
                <ProjectList />
            </div>
        </div>
    )
}