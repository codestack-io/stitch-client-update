import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/page";
import Register from "../Pages/Auth/Register/page";
import ServicesSection from "../Pages/Servicesection/Servicesection";
import ErrorPage from "../Pages/Errorpage/Errorpage";
import Overview from "../Pages/Dashboard/Overviews/Overviews";
import MyItems from "../Pages/Dashboard/My Items/My Items";
import Reports from "../Pages/Dashboard/Reports/Reports";
import Categories from "../Pages/Dashboard/Categories/Categories";
import Orders from "../Pages/Dashboard/AllOrders/AllOrders";
import NewOrder from "../Pages/NewOrder/NewOrder";
import PrivateRoutes from "./PrivateRoutes";
import ManageItems from "../Pages/Dashboard/AllOrders/AllOrders";
import AllProductsLayout from "../Layouts/AllProductsLayout";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import DashboardLayout from "../Layouts/DashboardLayout";

import Products from "../Pages/Products/Products";
import AllProducts from "../Pages/Dashboard/AllProducts/AllProducts";
import EditProducts from "../Pages/Dashboard/EditProducts/EditProducts";
import ManageUsers from "../Pages/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";

import AllOrders from "../Pages/Dashboard/AllOrders/AllOrders";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import PendingOrders from "../Pages/Dashboard/PendingOrders/PendingOrders";
import ApprovedOrders from "../Pages/Dashboard/ApprovedOrders/ApprovedOrders";
import MyProfile from "../Pages/Dashboard/My Profile/My Profile";

export const router = createBrowserRouter([

  /* ================= HOME ================= */
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },

  /* ================= AUTH ================= */
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  /* ================= SERVICES ================= */
  {
    path: "/servicesection",
    element: <ServicesSection />,
  },

  /* ================= EXPLORE ROUTE (MAIN FIX) ================= */
  {
    path: "/products",
    element: <AllProductsLayout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: async () => {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/products`
          );

          if (!res.ok) {
            throw new Response("Failed to load products", {
              status: res.status,
            });
          }

          return res.json();
        },
      },
    ],
  },

  /* ================= PRODUCT DETAILS (PUBLIC) ================= */
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
    },
  },

  /* ================= ORDER ================= */
  {
    path: "/neworder/:id",
    element: (
      <PrivateRoutes>
        <NewOrder />
      </PrivateRoutes>
    ),
  },

  /* ================= DASHBOARD ================= */
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "allorders",
        element: (
          <AdminRoute>
            <AllOrders />
          </AdminRoute>
        ),
      },
      {
        path: "products",
        element: (
          <AdminRoute>
            <AllProducts />
          </AdminRoute>
        ),
      },
      {
        path: "edit-product/:id",
        element: <EditProducts />,
      },
      {
        path: "manageusers",
        element: <ManageUsers />,
      },
       {
        path: "allproducts",
        element: <ManageItems />,
      },
      {
        path: "payment/:id",
        element: <Payment />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "pendingorders",
        element: <PendingOrders />,
      },
      {
        path: "approvedorders",
        element: <ApprovedOrders />,
      },
      {
        path: "myprofile",
        element: <MyProfile />,
      },
      {
  path: "overview",
  element: <Overview />,
},
{
  path: "my-items",
  element: <MyItems />,
},
{
  path: "reports",
  element: <Reports />,
},
{
  path: "categories",
  element: <Categories />,
},
{
  path: "allorders",
  element: <Orders />,
},
    ],
  },
]);