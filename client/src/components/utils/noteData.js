const notes = [
  {
    _id: "1",
    title: "Setup Development Environment",
    content: "Install Node.js, Visual Studio Code, and Git. Configure VS Code with essential extensions like ESLint and Prettier.",
    creationDate: "2024-06-01"
  },
  {
    _id: "2",
    title: "Create Project Structure",
    content: "Initialize a new project using npm. Set up a basic folder structure with src, test, and config directories.",
    creationDate: "2024-06-03"
  },
  {
    _id: "3",
    title: "Implement User Authentication",
    content: "Develop user registration and login functionality using JWT for authentication. Ensure to include password hashing.",
    creationDate: "2024-06-05"
  },
  {
    _id: "4",
    title: "Set Up Database",
    content: "Configure a MongoDB database. Create models for users and posts, and set up Mongoose for data validation and schema management.",
    creationDate: "2024-06-07"
  },
  {
    _id: "5",
    title: "Build REST API",
    content: "Create RESTful endpoints for CRUD operations on users and posts. Implement middleware for error handling and request validation.",
    creationDate: "2024-06-09"
  },
  {
    _id: "6",
    title: "Develop Frontend Interface",
    content: "Set up a React project. Create components for user login, registration, and post creation. Integrate with the backend API.",
    creationDate: "2024-06-11"
  },
  {
    _id: "7",
    title: "Implement State Management",
    content: "Add Redux for state management. Create actions and reducers for user authentication and post management.",
    creationDate: "2024-06-13"
  },
  {
    _id: "8",
    title: "Write Unit Tests",
    content: "Use Jest and Enzyme to write unit tests for frontend components and backend endpoints. Ensure at least 80% test coverage.",
    creationDate: "2024-06-15"
  }
];

export const loader = function() {
    return notes;
}

export const addNote = function(note) {
    const newNote = {...note, _id: "" + (notes.length + 1)};
    notes.push(newNote);
}

export const editNote = function(note) {
    let noteIndex = notes.findIndex((n) => n._id === note._id);
    notes[noteIndex] = {...notes[noteIndex], title: note.title, content: note.content};
}