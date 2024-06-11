import './App.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Summary from './components/Summary/Summary';
import Dashboard from './components/Dashboard/Dashboard';
import ProjectList from './components/ProjectList/ProjectList';
import Notes from './components/Notes/Notes';
import Root from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Summary />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'projects',
        element: <ProjectList />
      },
      {
        path: 'notes',
        element: <Notes />
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
