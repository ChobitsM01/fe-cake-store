import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/Login/Login';
import { NotFound } from "../pages/404/NotFound";
import { AdminLayout, Layout } from "../Layout";
import User from "../pages/Admin/User/User";
import Register from "../pages/Register/Register";
import HomePage from "../pages/User/HomePage/HomePage";
import Cart from "../pages/User/Cart/Cart";
import Order from "../pages/Admin/Order/Order";
import Categories from "../pages/Admin/Categories/Categories";
import ProductManagement from "../pages/Admin/ProductManagement/ProductManagement";
import Products from "../pages/User/Product/Products";
import Contact from "../pages/User/Contact/Contact";
import FeedBack from "../pages/User/FeedBack/FeedBack";
import DashBoard from "../pages/Admin/DashBoard/DashBoard";
import DetailProduct from "../pages/User/DetailProduct/DetailProduct";
import ProductByCategory from "../pages/User/Product/ProductByCategory";
import { Forbidden } from "../components/Forbidden/Forbidden";
import Permission from "../pages/Admin/Permission/Permission";
import Checkout from "../pages/Checkout/Checkout";
import ProductFilter from "../pages/User/Product/ProductFilter";
import SaleAnalytics from "../pages/Admin/SaleAnalytics/SaleAnalytics";

const router = createBrowserRouter( [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "forbidden",
        element: <Forbidden />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: "product/:id",
        element: <DetailProduct />,
      },
      {
        path: "search",
        element: <ProductFilter />,
      },
      {
        path: "category/:id",
        element: <ProductByCategory />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "feedback",
        element: <FeedBack />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: < DashBoard />,
      },
      {
        path: "product-management",
        element: <ProductManagement />,
      },
      {
        path: "users-management",
        element: <User />,
      },
      {
        path: "order-management",
        element: <Order />,
      },
      {
        path: "categories-management",
        element: <Categories />,
      },
      {
        path: "permission-management",
        element: <Permission />,
      },
      {
        path: "sale",
        element: <SaleAnalytics />,
      },
    ],
  }
] );

export default router