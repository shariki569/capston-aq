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
import { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


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
// import Media from "./Components/admin/Media/GalleryMedia/Media";
import PostsLayout from "./Components/layouts/PostsLayout";
import Posts_Menu from "./Components/admin/Posts/Posts_Menu";
import Accommodation_Single from "./pages/Accommodation/Accommodation_Single";

// Context import
import { AuthContext } from "./context/authContext";

// Styles import
import "./style.scss";
import { Facility_Menu, Add_Facility } from "./Components/admin/Facilities";
import FacilityLayout from "./Components/layouts/FacilityLayout";
import AmenitiesLayout from "./Components/layouts/AmenitiesLayout";
import Amenities_Menu from "./Components/admin/Amenities/Amenities_Menu";
import Facilities from "./pages/Facility/Facilities";
import Chatbot from "./Components/admin/Chatbot/Chatbot";
import User from "./Components/admin/User";
import DashboardChatbotLayout from "./Components/layouts/DashboardChatbotLayout/DashboardChatbotLayout";
import AddIntent from "./Components/admin/Chatbot/Add_Intent/AddIntent";
import FAQs from "./pages/FAQs/FAQs";
import Unauthorized from "./Components/admin/Unauthorized/Unauthorized";


// const PrivateRoute = ({ element, path }) => {
//   const { currentUser } = useContext(AuthContext);
//   return currentUser ? element : <Navigate to="/login" />;
// };

const PrivateRoute = ({ element, path }) => {
  const { currentUser } = useContext(AuthContext);
  
  if (!currentUser) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  } else if (currentUser.Role_Name === 'User') {
    // If the user's role is 'User', redirect to an unauthorized page
    return <Navigate to="/unauthorized" />;
  } else {
    // If the user's role is 'Admin', allow them to access the dashboard
    return element;
  }
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
        path: "/post/:title/:id",
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
        path: "/facilities",
        element: <Facilities />,
      },
      {
        path: "/accommodation/:title/:id",
        element: <Accommodation_Single />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/frequently-asked-questions",
        element: <FAQs />,
      }
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute element={<DashboardLayout />} />,
    children: [
      {
        path: '',
        element: <PrivateRoute element={<Dashboard />} />,
      },
      {
        path: "users",
        element: <PrivateRoute element={<User />} />,
      },
      {
        path: "posts",
        element: <PrivateRoute element={<PostsLayout />} />,
        children: [
          {
            path: "",
            element: <PrivateRoute element={<Posts_Menu />} />,
          },
          {
            path: "write",
            element: <PrivateRoute element={<Write />} />,
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
        path: "facilities",
        element: <PrivateRoute element={<FacilityLayout />} />,
        children: [
          {
            path: "",
            element: <PrivateRoute element={<Facility_Menu />} />,
          },
          {
            path: "write",
            element: <PrivateRoute element={<Add_Facility />} />,
          },
        ]
      },
      {
        path: "amenities",
        element: <PrivateRoute element={<AmenitiesLayout />} />,
        children: [
          {
            path: "",
            element: <PrivateRoute element={<Amenities_Menu />} />,
          }

        ]
      },
      {
        path: "chatbot",
        element: <PrivateRoute element={<DashboardChatbotLayout />} />,
        children: [
          {
            path: "",
            element: <PrivateRoute element={<Chatbot />} />,
          },
          {
            path: "add-intent",
            element: <PrivateRoute element={<AddIntent />} />,
          }
        ]
      },
      {
        path: "contact-details",
        element: <PrivateRoute element={<Contact_Info />} />,
      },
      // {
      //   path: "media",
      //   element: <PrivateRoute element={<Media />} />,
      // }


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
    path: "/unauthorized",
    element: <Unauthorized/>,
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
