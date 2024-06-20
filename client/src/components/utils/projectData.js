export const projects = [
    {
        id: 1,
        name: "Project Alpha",
        description: "Development of a new e-commerce platform.",
        priority: "High",
        deadline: "2024-07-15",
        status: "In Progress"
    },
    {
        id: 2,
        name: "Project Beta",
        description: "Redesign of the company website.",
        priority: "Medium",
        deadline: "2024-08-01",
        status: "Not Started"
    },
    {
        id: 3,
        name: "Project Gamma",
        description: "Implementation of a customer feedback system.",
        priority: "Low",
        deadline: "2024-09-10",
        status: "In Progress"
    },
    {
        id: 4,
        name: "Project Delta",
        description: "Upgrade of the internal network infrastructure.",
        priority: "High",
        deadline: "2024-06-30",
        status: "Completed"
    },
    {
        id: 5,
        name: "Project Epsilon",
        description: "Development of a mobile application.",
        priority: "Medium",
        deadline: "2024-10-05",
        status: "In Progress"
    },
    {
        id: 6,
        name: "Project Zeta",
        description: "Launch of a new marketing campaign.",
        priority: "Low",
        deadline: "2024-07-20",
        status: "Not Started"
    },
    {
        id: 7,
        name: "Project Eta",
        description: "Integration with third-party payment gateways.",
        priority: "High",
        deadline: "2024-08-15",
        status: "In Progress"
    },
    {
        id: 8,
        name: "Project Theta",
        description: "Data migration to the new server.",
        priority: "Medium",
        deadline: "2024-07-01",
        status: "Completed"
    },
    {
        id: 9,
        name: "Project Iota",
        description: "Implementation of security protocols.",
        priority: "High",
        deadline: "2024-09-30",
        status: "In Progress"
    },
    {
        id: 10,
        name: "Project Kappa",
        description: "Employee training and development program.",
        priority: "Low",
        deadline: "2024-11-01",
        status: "Not Started"
    }
]; 

export const getProject = function(id) {
    return projects.find((proj) => proj.id === +id);
}