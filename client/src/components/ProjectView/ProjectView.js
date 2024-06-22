import { useLoaderData } from "react-router-dom";

export default function ProjectView() {

    const project = useLoaderData();

   return (
    <div className="outlet-output">
        <h1 className="outlet-header">{project.name}</h1>
    </div>
    );
}