import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/page";
import Register from "../Pages/Auth/Register/page";
import ServicesSection from "../Pages/Servicesection/Servicesection";
import ErrorPage from "../Pages/Errorpage/Errorpage";


import NewOrder from "../Pages/NewOrder/NewOrder";
import PrivateRoutes from './PrivateRoutes'

import AllProductsLayout from "../Layouts/AllProductsLayout";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import DashboardLayout from "../Layouts/DashboardLayout";
;
import AllOrders from "../Pages/Dashboard/AllOrders/AllOrders";
import Products from "../Pages/Products/Products";
import AllProducts from "../Pages/Dashboard/AllProducts/AllProducts";
import EditProducts from "../Pages/Dashboard/EditProducts/EditProducts";
import ManageUsers from "../Pages/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import Payment from "../Pages/Dashboard/Payment/Payment";

import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import PendingOrders from "../Pages/Dashboard/PendingOrders/PendingOrders";
import ApprovedOrders from "../Pages/Dashboard/ApprovedOrders/ApprovedOrders";
import MyProfile from "../Pages/Dashboard/My Profile/My Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children:[
      {
        index:true,
        element: <Home />,

      }
    ]
  },
  {
    path:"/",
   
    element:<AuthLayout/>,
    children:[
      {
        path:'login',
        
        element:<Login/>,

      },
      {
        path:'Register',
        
        element:<Register/>,
      }
    ]
  },
  {
    path:"/servicesection",
   
    element:<ServicesSection/>,
  },
 
  {
    path:"/",
    element:<AllProductsLayout/>,
    children:[
      {
          path:"/products",
    element:<Products/>,
    loader: async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);


  if (!res.ok) {
    throw new Response("Failed to load products", {
      status: res.status,
    });
  }

  return res.json();
}


      },
      {
  path: "/product-details/:id",
  element: <ProductDetails />,
  loader: async ({ params }) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/products/${params.id}`
    );

    if (!res.ok) {
      throw new Response("Product not found", { status: res.status });
    }

    return res.json();
  }
}
    ]
  },
    
  {
    path:"/product-details/:id",
    element:<PrivateRoutes> 
             <ProductDetails/>
           </PrivateRoutes>,
  
    
  
loader: ({ params }) =>
  fetch(`${import.meta.env.VITE_API_URL}/products/${params.id}`)
 

},
    
  
{
  path: "/neworder/:id",
  element: (
    <PrivateRoutes>
      <NewOrder />
    </PrivateRoutes>
  ),
  loader: async ({ params }) => {
   const res = await fetch(`https://stitch-track-server.vercel.app/products/${params.id}`);


    if (!res.ok) {
      throw new Response("Product not found", { status: res.status });
    }

    return res.json();
  }
},

{
  path:"/dashboard",
  element:<PrivateRoutes><DashboardLayout/></PrivateRoutes>,
    children:[
    
     {
      path:"allorders",
      element: <AdminRoute><AllOrders/></AdminRoute>
     },
     {
        path:"products",
       element:<AdminRoute><AllProducts/></AdminRoute>,
    },
    {
    path:  "edit-product/:id",
    element: <EditProducts/>
    },
    {
     path: "manageusers",
     element: <ManageUsers/> 
        
    },
    {
      path:"payment/:id",
      element:<Payment></Payment>
    },
    {
       path:"payment-success",
       element:<PaymentSuccess/>
   },
    
  {
    path:'payment-history',
    element:<PaymentHistory/>
  },
  {
    path:'pendingorders',
    element:<PendingOrders/>
  },
  {
    path:'approvedorders',
    element:<ApprovedOrders/>
  },
  {
  path: 'myprofile',
  element: <MyProfile/>
}

]

}






]);