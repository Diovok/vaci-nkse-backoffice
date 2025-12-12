import { createBrowserRouter, Navigate } from 'react-router-dom';

import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

const router = createBrowserRouter(
  [
    { path: '/', element: <Navigate to="/login" replace /> },
    LoginRoutes,
    MainRoutes,
    { path: '*', element: <Navigate to="/login" replace /> }
  ],
  { basename: import.meta.env.BASE_URL }
);

export default router;
