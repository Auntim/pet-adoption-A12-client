import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

import { Toaster } from 'react-hot-toast'
import Root from './components/root/Root';
import Home from './components/home/Home';
import AuthProviders from './components/provider/AuthProvider';
import Login from './components/pages/Login';
import { HelmetProvider } from 'react-helmet-async';
import Register from './components/pages/Register';
import DashboardLayout from './Dashboard/DashboardLayout';
import PrivateRoutes from './components/Routes/PrivateRoutes';
import UserHome from './Dashboard/UserPage/UserHome';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
    children: [
      // normal user
      {
        path: 'userHome',
        element: <UserHome></UserHome>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProviders>
          <RouterProvider router={router} />
        </AuthProviders>
        <Toaster position='top-right' reverseOrder={false} />
      </HelmetProvider>
    </QueryClientProvider>

  </StrictMode>,
)
