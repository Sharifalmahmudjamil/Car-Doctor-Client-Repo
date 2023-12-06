import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './Layout/MainLayout';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import AuthProviders from './Providers/AuthProviders';
import CheckOut from './Pages/CheckOut/CheckOut';
import Bookings from './Pages/Bookings/Bookings';
import PrivateRoute from './Pages/Routes/PrivateRoute';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:"signUp",
        element:<SignUp></SignUp>
      },
     
      {
        path:'checkout/:id',
        element:<PrivateRoute>
          <CheckOut></CheckOut>
        </PrivateRoute>,
        loader:({params})=>fetch (`https://car-doctor-server-mu-seven.vercel.app/services/${params.id}`)
      },
      {
        path:'bookings',
        element:<PrivateRoute>
          <Bookings></Bookings>
        </PrivateRoute>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 <div className='max-w-7xl mx-auto'>
   <React.StrictMode>
    <AuthProviders>
    <RouterProvider router={router} />
    </AuthProviders>
  </React.StrictMode>,
 </div>
)
