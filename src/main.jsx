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
// import DashboardLayout from './Dashboard/DashboardLayout';
import PrivateRoutes from './components/Routes/PrivateRoutes';
import UserHome from './Dashboard/UserPage/UserHome';
import Dashboard from './Dashboard/Dashboard';
import AddPet from './Dashboard/AddPet/AddPet';
import PetsListing from './components/pages/PetsListing';
import PetDetails from './components/pages/PetDetails';
import DonationCampaign from './components/pages/DonationCampaign';
import CreateDonationCampaigns from './components/pages/CreateDonationCampaigns';
import DonationDetails from './components/pages/DonationDetails';
import AllPets from './Shared/Allpets/Allpets';
import UpdatePet from './Dashboard/Updatepet/UpdatePet';
import MyDonationCampaigns from './Dashboard/MyDonationCampaigns';
import AllUsers from './Dashboard/AllUser/AllUsers';
// import MyDonations from './components/pages/MyDonations';
import PaymentHistory from './components/pages/PaymentHistory';
// import MyDonations from './components/pages/MyDonations';

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
      },
      {
        path: 'allpets',
        element: <PetsListing></PetsListing>
      },
      {
        path: 'pets/:id',
        element: <PrivateRoutes><PetDetails></PetDetails></PrivateRoutes>
      },
      {
        path: 'alldonationCampaigns',
        element: <DonationCampaign></DonationCampaign>
      },
      {
        path: 'donationCampaigns/:id',
        element: <PrivateRoutes><DonationDetails></DonationDetails></PrivateRoutes>
      },
      {
        path: '/dashboard/update-pet/:id',
        element: <UpdatePet></UpdatePet>
      },
      // {
      //   path: '/dashboard/my-donations',
      //   element: <PrivateRoutes><MyDonations></MyDonations></PrivateRoutes>
      // }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      // normal user
      {
        path: 'userHome',
        element: <UserHome></UserHome>
      },
      // only admin
      {
        path: 'addpets',
        element: <AddPet></AddPet>
      },
      {
        path: 'donationCampaigns',
        element: <CreateDonationCampaigns></CreateDonationCampaigns>
      },
      {
        path: 'allAddedpets',
        element: <AllPets></AllPets>
      },
      {
        path: 'myDonationCampaigns',
        element: <MyDonationCampaigns></MyDonationCampaigns>
      },
      {
        path: 'users',
        element: <AllUsers></AllUsers>
      }
      ,
      {
        path: 'allpets',
        element: <PetsListing></PetsListing>
      },

      {
        path: 'payment-history',
        element: <PaymentHistory></PaymentHistory>
      },
      // {
      //   path: 'my-donations',
      //   element: <MyDonations></MyDonations>
      // },
      // {
      //   path: '/my-donations',
      //   element: <MyDonations></MyDonations>
      // }

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
