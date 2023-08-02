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
import Accommodate from "./Components/admin/Accommodate";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

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
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <PrivateRoute element={<Dashboard />} path="/dashboard" />,
      },
      {
        path: "/write",
        element: <PrivateRoute element={<Write />} path="/add-posts" />,
      },
      {
        path: "/pages",
        element: <PrivateRoute element={<Pages />} path="/edit-pages" />,
      },
      {
        path: "/accommodate",
        element: <PrivateRoute element={<Accommodate />} path="/edit-accommodation" />,
      },
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
