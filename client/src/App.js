import './App.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import SummaryPage from './pages/SummaryPage';
import DashboardPage from './pages/DashboardPage';
import ProjectListPage from './pages/ProjectListPage';
import NotesPage from './pages/NotesPage';
import Root from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <SummaryPage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'projects',
        element: <ProjectListPage />
      },
      {
        path: 'notes',
        element: <NotesPage />
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
