import { tickets } from "./ticketData";
import { users } from "./userData";

export const projects = [
    {
        _id: 1,
        name: "E-Commerce Platform Development",
        shortDescription: "Develop a new e-commerce platform.",
        longDescription: "This project involves building a robust and scalable e-commerce platform that supports multiple payment gateways, high traffic volumes, and seamless user experiences.",
        priority: "High",
        deadline: "2024-07-15",
        status: "In Progress",
        assignedTickets: [1, 2, 3, 4, 41, 42],
        assignedDevs: [7, 8, 27],
        manager: {
            _id: 2,
            name: "Manager One",
        }
    },
    {
        _id: 2,
        name: "Company Website Redesign",
        shortDescription: "Redesign the company website.",
        longDescription: "The goal is to modernize the company's website with a fresh look, improved navigation, and responsive design to enhance user engagement and SEO performance.",
        priority: "Medium",
        deadline: "2024-08-01",
        status: "Not Started",
        assignedTickets: [5, 6, 7, 8, 43, 44],
        assignedDevs: [9, 10, 28],
        manager: {
            _id: 2,
            name: "Manager One",
        }
    },
    {
        _id: 3,
        name: "Customer Feedback System",
        shortDescription: "Implement a customer feedback system.",
        longDescription: "This project aims to create a comprehensive feedback system that allows customers to provide input through surveys, reviews, and direct messages, enabling better customer satisfaction tracking.",
        priority: "Low",
        deadline: "2024-09-10",
        status: "In Progress",
        assignedTickets: [9, 10, 11, 12, 45, 46],
        assignedDevs: [11, 12, 29],
        manager: {
            _id: 3,
            name: "Manager Two",
        }
    },
    {
        _id: 4,
        name: "Network Infrastructure Upgrade",
        shortDescription: "Upgrade internal network infrastructure.",
        longDescription: "Upgrading the company's internal network to enhance speed, reliability, and security, ensuring seamless communication and data transfer across all departments.",
        priority: "High",
        deadline: "2024-06-30",
        status: "Completed",
        assignedTickets: [13, 14, 15, 16, 47, 48],
        assignedDevs: [13, 14, 30],
        manager: {
            _id: 3,
            name: "Manager Two",
        }
    },
    {
        _id: 5,
        name: "Mobile Application Development",
        shortDescription: "Develop a mobile application.",
        longDescription: "Creating a mobile app that complements the company’s services, featuring a user-friendly interface, secure login, and offline capabilities to boost customer accessibility and engagement.",
        priority: "Medium",
        deadline: "2024-10-05",
        status: "In Progress",
        assignedTickets: [17, 18, 19, 20, 49, 50],
        assignedDevs: [15, 16, 31],
        manager: {
            _id: 4,
            name: "Manager Three",
        }
    },
    {
        _id: 6,
        name: "Marketing Campaign Launch",
        shortDescription: "Launch a new marketing campaign.",
        longDescription: "A comprehensive marketing campaign aimed at increasing brand awareness and driving sales through social media, email marketing, and partnerships with influencers and media outlets.",
        priority: "Low",
        deadline: "2024-07-20",
        status: "Not Started",
        assignedTickets: [21, 22, 23, 24, 51, 52],
        assignedDevs: [17, 18, 32],
        manager: {
            _id: 4,
            name: "Manager Three",
        }
    },
    {
        _id: 7,
        name: "Payment Gateway Integration",
        shortDescription: "Integrate third-party payment gateways.",
        longDescription: "This project focuses on integrating the company's system with multiple third-party payment gateways to provide customers with more payment options and streamline the checkout process.",
        priority: "High",
        deadline: "2024-08-15",
        status: "In Progress",
        assignedTickets: [25, 26, 27, 28, 53, 54],
        assignedDevs: [19, 20, 33],
        manager: {
            _id: 5,
            name: "Manager Four",
        }
    },
    {
        _id: 8,
        name: "Data Migration to New Server",
        shortDescription: "Migrate data to new server.",
        longDescription: "Migrating all company data to a new, more efficient server with minimal downtime, improving data access speed and storage capabilities while ensuring data integrity.",
        priority: "Medium",
        deadline: "2024-07-01",
        status: "Completed",
        assignedTickets: [29, 30, 31, 32, 55, 56],
        assignedDevs: [21, 22, 34],
        manager: {
            _id: 5,
            name: "Manager Four",
        }
    },
    {
        _id: 9,
        name: "Security Protocols Implementation",
        shortDescription: "Implement new security protocols.",
        longDescription: "Enhancing the company's cybersecurity measures by implementing advanced security protocols, including multi-factor authentication, encryption, and regular security audits.",
        priority: "High",
        deadline: "2024-09-30",
        status: "In Progress",
        assignedTickets: [33, 34, 35, 36, 57, 58],
        assignedDevs: [23, 24, 35],
        manager: { 
            _id: 6,
            name: "Manager Five",
        }
    },
    {
        _id: 10,
        name: "Employee Training Program",
        shortDescription: "Develop employee training and development program.",
        longDescription: "Developing a comprehensive training and development program for employees to improve their skills and knowledge, fostering career growth and enhancing overall company performance.",
        priority: "Low",
        deadline: "2024-11-01",
        status: "Not Started",
        assignedTickets: [37, 38, 39, 40, 59, 60],
        assignedDevs: [25, 26, 36],
        manager: {
            _id: 6,
            name: "Manager Five",
        }
    }
];


export const getProject = function(id) {
    const project = {...projects.find((proj) => proj._id === +id)};

    const assignedDevs = project.assignedDevs.map((devId) => {
        return {...users.find((user) => user._id === devId)};
    });

    project.assignedDevs = assignedDevs;

    const assignedTickets = project.assignedTickets.map((tickedId) => {
        return {...tickets.find((ticket) => ticket.id === tickedId)};
    });

    project.assignedTickets = assignedTickets;

    console.log(project);

    return project;

}