import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  useNavigate
} from "react-router-dom";
import { Footer, Nav } from "./Components";
import { Home, Login, Register, Single, Write,About } from "./pages";
import './style.scss'
import Dashboard from "./Components/admin/Dashboard";
import DashboardLayout from "./Components/layouts/DashboardLayout";
import Layout from "./Components/layouts/Layout";
import Pages from "./Components/admin/Pages";








const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path:"/",
        element:<Home/>
      },
      {
        path: "/about-us",
        element:<About/>
      },
      {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      },
    ]
  },
  {
    path: "/",
    element: <DashboardLayout/>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/add-posts",
        element: <Write/>
      },
      {
        path: "/edit-pages",
        element: <Pages/>
      },
    ]
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  
  {
    path: "/create-blog",
    element: <Write/>,
  },
 
]);


function App() {

  return (
   
      <div className="app">
        <div className="container">
          <RouterProvider router={router}/>
        </div>
      </div>
  
  )
}


export default App
