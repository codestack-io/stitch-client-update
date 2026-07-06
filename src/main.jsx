import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './Routes/Router.jsx';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './Components/Context/AuthContext/AuthProvider.jsx';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <RouterProvider router={router} />
    <ToastContainer
     position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored" />
    </AuthProvider>
    </QueryClientProvider>
    
    
  </StrictMode>
)
