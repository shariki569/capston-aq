import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Single,
  Write,
  About,
  Posts,
  Contact,
  Accommodation,
} from "./pages";
import "./style.scss";
import Dashboard from "./Components/admin/Dashboard";
import DashboardLayout from "./Components/layouts/DashboardLayout";
import Layout from "./Components/layouts/Layout";
import Pages from "./Components/admin/Pages";
import { Accommodation_Menu, Add_Accommodate } from "./Components/admin/Accommodate";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import AccommodationMenuLayout from "./Components/layouts/AccommodationLayout";
import Accommodation_Items from "./pages/Accommodation/Accommodation_Items";
import Contact_Info from "./Components/admin/Contact_Info";

const PrivateRoute = ({ element, path }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? element : <Navigate to="/login" />;
};



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/accommodation",
        element: <Accommodation />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "admin",
        element: <PrivateRoute element={<Dashboard />} />,
      },
      {
        path: "write",
        element: <PrivateRoute element={<Write />} />,
      },
      {
        path: "pages",
        element: <PrivateRoute element={<Pages />} />,
      },
      {
        path: "accommodation-menu",
        element: <PrivateRoute element={<AccommodationMenuLayout />} />,
        children: [
          {
            path: "",
            element: <PrivateRoute element={<Accommodation_Menu />} />,
          },
          {
            path: "write",
            element: <PrivateRoute element={<Add_Accommodate />} />,
          }
        ]
      },
      {
        path: "contact-details",
        element: <PrivateRoute element={<Contact_Info />} />,
      }


    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/create-blog",
    element: <Write />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
