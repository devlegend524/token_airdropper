import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('pages/Home'));
const Airdrop = lazy(() => import('pages/Airdrop'));
const NotFound = lazy(() => import('pages/NotFound'));
const Admin = lazy(() => import('pages/Admin'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/airdrop',
    element: <Airdrop />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
