import './App.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import TicketsPage from './pages/TicketsPage';
import DashboardPage from './pages/DashboardPage';
import ProjectListPage from './pages/ProjectListPage';
import NotesPage from './pages/NotesPage';
import Root from './pages/Root';
import ProjectView from './components/ProjectView/ProjectView';

import { getProject } from './components/utils/projectData';
import { getAllTickets } from './components/utils/ticketData';

import { loader as notesLoader } from './components/utils/noteData';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <DashboardPage />
      },
      {
        path: 'tickets',
        element: <TicketsPage />,
        loader: getAllTickets
      },
      {
        path: 'projects',
        element: <ProjectListPage />,
      },
      {
        path: '/projects/:projectId',
        element: <ProjectView />,
        loader: ({params}) => {
          return getProject(+params.projectId);
        }
      },
      {
        path: 'notes',
        element: <NotesPage />,
        loader: notesLoader,
        children: [
          {
            path: 'add'
          },
          {
            path: 'edit'
          }
        ]
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
