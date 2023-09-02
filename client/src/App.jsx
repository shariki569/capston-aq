// React and React Router imports
import React, { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";

// Components imports
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
import Dashboard from "./Components/admin/Dashboard";
import Layout from "./Components/layouts/Layout";
import DashboardLayout from "./Components/layouts/DashboardLayout";
import Pages from "./Components/admin/Pages";
import {
  Accommodation_Menu,
  Add_Accommodate,
} from "./Components/admin/Accommodate";
import AccommodationMenuLayout from "./Components/layouts/AccommodationLayout";
import Accommodation_Items from "./pages/Accommodation/Accommodation_Items";
import Contact_Info from "./Components/admin/Contact_Info";
import Media from "./Components/admin/Media";
import PostsLayout from "./Components/layouts/PostsLayout";
import Posts_Menu from "./Components/admin/Posts/Posts_Menu";
import Accommodation_Single from "./pages/Accommodation/Accommodation_Single";

// Context import
import { AuthContext } from "./context/authContext";

// Styles import
import "./style.scss";
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
        path: "/accommodations",
        element: <Accommodation />,
      },
      {
        path: "/accommodation/:title/:id",
        element: <Accommodation_Single />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute element={<DashboardLayout />} />,
    children: [
      {
        path: "admin",
        element: <PrivateRoute element={<Dashboard />} />,
      },
      {
        path: "posts",
        element: <PrivateRoute element={<PostsLayout/>} />,
        children: [
          {
            path: "",
            element: <PrivateRoute element={<Posts_Menu/>} />, 
          },
          {
            path: "write",
            element: <PrivateRoute element={<Write/>} />, 
          },
          

        ]
      },
      {
        path: "pages",
        element: <PrivateRoute element={<Pages />} />,
      },
      {
        path: "accommodations",
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
      },
      {
        path: "media",
        element: <PrivateRoute element={<Media />} />,
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
